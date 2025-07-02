import fitz  # PyMuPDF
import re
import os
import datetime
import logging
import pdfplumber
from typing import Dict, List, Optional, Any, Tuple

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger('pdf_parser')

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts raw text content from all pages of a PDF file.
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        str: Extracted text content from all pages
    """
    logger.info(f"Extracting text from PDF: {os.path.basename(pdf_path)}")
    
    if not os.path.exists(pdf_path):
        logger.error(f"PDF file not found at {pdf_path}")
        return ""
    
    try:
        doc = fitz.open(pdf_path)
        text = ""
        page_count = len(doc)
        logger.info(f"PDF has {page_count} pages")
        
        for page_num in range(page_count):
            page = doc.load_page(page_num)
            page_text = page.get_text("text")
            text += f"\n--- Page {page_num + 1} ---\n{page_text}\n"
            logger.debug(f"Extracted {len(page_text)} characters from page {page_num + 1}")
        
        doc.close()
        logger.info(f"Completed text extraction: {len(text)} total characters")
        return text
        
    except Exception as e:
        logger.error(f"Error processing PDF {pdf_path}: {str(e)}")
        return ""

def extract_tables_from_pdf(pdf_path: str) -> List[Dict[str, Any]]:
    """
    Extracts tables from a PDF file using pdfplumber with position information.
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        List[Dict[str, Any]]: List of extracted tables with page number, position and formatted content
    """
    logger.info(f"Extracting tables from PDF: {os.path.basename(pdf_path)}")
    
    if not os.path.exists(pdf_path):
        logger.error(f"PDF file not found at {pdf_path}")
        return []
    
    tables_with_position = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            total_pages = len(pdf.pages)
            logger.info(f"Scanning {total_pages} pages for tables")
            
            for page_num, page in enumerate(pdf.pages):
                logger.debug(f"Extracting tables from page {page_num + 1}/{total_pages}")
                page_tables = page.extract_tables()
                
                if page_tables:
                    logger.info(f"Found {len(page_tables)} tables on page {page_num + 1}")
                
                for table_num, table in enumerate(page_tables):
                    if table and len(table) > 0:
                        # Format the table as a string
                        table_str = f"\n--- TABLE START ---\n"
                        
                        # Calculate column widths for better formatting
                        col_widths = [max(len(str(row[i])) if i < len(row) else 0 for row in table) for i in range(max(len(row) for row in table))]
                        
                        # Format each row
                        for row in table:
                            row_str = ""
                            for i, cell in enumerate(row):
                                cell_text = str(cell).strip() if cell else ""
                                row_str += f"{cell_text:{col_widths[i] + 2}}"
                            table_str += row_str + "\n"
                        
                        table_str += "--- TABLE END ---\n"
                        
                        # Get table position on page
                        # Note: pdfplumber tables have bbox attribute (x0, top, x1, bottom)
                        table_bbox = None
                        if hasattr(page, 'find_tables') and callable(page.find_tables):
                            tables_info = page.find_tables()
                            if table_num < len(tables_info):
                                table_bbox = tables_info[table_num].bbox
                                logger.debug(f"Table {table_num + 1} position: {table_bbox}")
                        
                        tables_with_position.append({
                            "page_num": page_num + 1,
                            "table_num": table_num + 1,
                            "content": table_str,
                            "position": table_bbox  # This will be None if position can't be determined
                        })
                        
                        logger.debug(f"Extracted table {table_num + 1} from page {page_num + 1} with {len(table)} rows")
        
        logger.info(f"Completed table extraction: {len(tables_with_position)} tables found")
        return tables_with_position
        
    except Exception as e:
        logger.error(f"Error extracting tables from PDF {pdf_path}: {str(e)}")
        return []

def clean_extracted_text(text: str) -> str:
    """
    Customize this heavily based on your PDF structure!
    
    Args:
        text (str): Raw extracted text
        
    Returns:
        str: Cleaned text with preserved table formatting
    """
    logger.info(f"Cleaning extracted text ({len(text)} characters)")
    
    # Split the text by table markers to preserve table formatting
    table_pattern = r'(--- TABLE START ---[\s\S]*?--- TABLE END ---)'  
    parts = re.split(table_pattern, text)

    logger.info(f"Text split into {len(parts)} parts for cleaning")
    
    cleaned_parts = []
    for i, part in enumerate(parts):
        if part.startswith('--- TABLE START ---') and part.endswith('--- TABLE END ---'):
            # Preserve tables as is
            cleaned_parts.append(part)
        else:
            # Clean non-table text
            # Remove excessive newlines (more than 2 consecutive newlines)
            cleaned_part = re.sub(r'\n{3,}', '\n\n', part)
            # Remove multiple spaces
            cleaned_part = re.sub(r' {2,}', ' ', cleaned_part)
            # Remove leading/trailing whitespace from lines
            cleaned_part = '\n'.join([line.strip() for line in cleaned_part.split('\n')])
            # Remove empty lines that might result from stripping
            cleaned_part = '\n'.join([line for line in cleaned_part.split('\n') if line])
            cleaned_parts.append(cleaned_part)

    cleaned_text = "".join(cleaned_parts)
    logger.info(f"Completed text cleaning. Original: {len(text)} chars, Cleaned: {len(cleaned_text)} chars")
    return cleaned_text
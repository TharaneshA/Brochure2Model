import os
import json
import logging
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pygltflib import GLTF2
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import uuid
import datetime

# Import our core logic modules
import tempfile
import os
from core.pdf_parser import extract_text_from_pdf, extract_tables_from_pdf, clean_extracted_text
from core.hotspot_generator import HotspotGenerator

# --- Logging Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- FastAPI Application Setup ---
app = FastAPI(
    title="Brochure2Model API",
    description="Processes product brochures to generate interactive 3D hotspots.",
    version="1.0.0",
    max_request_body_size=50 * 1024 * 1024  # 50 MB
)

# --- CORS Middleware ---
# Allows our Next.js frontend (running on a different port) to communicate with this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://brochure2model.vercel.app"],  # IMPORTANT: Restrict to your frontend's URL and Vercel deployment
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# --- Pydantic Models (API Data Contracts) ---
# Defines the expected structure for API requests and responses.
# This provides strong validation and great editor support.

from pydantic import BaseModel, Field, FieldValidationInfo, field_validator

class Hotspot(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), example="a1b2c3d4-e5f6-7890-1234-567890abcdef")
    feature_title: str = Field(..., example="Panoramic Sunroof")
    marketing_summary: str = Field(..., example="Enjoy breathtaking views with the expansive sunroof.")
    feature_description: str # This will be populated from marketing_summary
    matched_part_name: str = Field(..., example="roof_panel")

    @field_validator('feature_description', mode='before')
    @classmethod
    def set_feature_description(cls, v: str, info: FieldValidationInfo) -> str:
        if 'marketing_summary' in info.data:
            return info.data['marketing_summary']
        return v

class SummarizationResponse(BaseModel):
    hotspots: List[Hotspot]
    key_selling_points: List[str] = Field(default_factory=list)

# --- Initialize our Generator ---
# Best practice: Initialize heavyweight objects once on application startup.
try:
    hotspot_generator = HotspotGenerator()
except ValueError as e:
    logger.critical(f"FATAL: Could not initialize HotspotGenerator: {e}")
    # In a real app, you might exit or prevent the app from starting fully.
    hotspot_generator = None


# --- API Endpoints ---
@app.get("/")
def read_root():
    """A simple endpoint to confirm the API is running."""
    return {"status": "Brochure2Model API is online."}

@app.get("/ping")
async def ping():
    """A simple endpoint for health checks."""
    return "ping"
@app.post("/extract-parts")
async def extract_parts_endpoint(
    model: UploadFile = File(..., description="The GLB 3D model file.")
):
    """
    Extracts part names from a GLB 3D model.
    """
    logger.info(f"Received request for GLB file: {model.filename}")
    try:
        # Save the uploaded GLB to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".glb") as tmp:
            tmp.write(await model.read())
            temp_glb_path = tmp.name

        glb = GLTF2().load(temp_glb_path)
        part_names = []
        for mesh in glb.meshes:
            if mesh.name:
                part_names.append(mesh.name)
        
        if not part_names:
            logger.warning("No mesh names found in the GLB file. Attempting to use node names.")
            for node in glb.nodes:
                if node.name:
                    part_names.append(node.name)

        if not part_names:
            logger.warning("No part names extracted from GLB file.")
        logger.info(f"Extracted part names: {part_names}")

        return {"part_names": part_names}
    except Exception as e:
        logger.error(f"Error processing GLB file: {e}")
        raise HTTPException(status_code=400, detail=f"Error processing GLB file: {e}")
    finally:
        if temp_glb_path and os.path.exists(temp_glb_path):
            os.remove(temp_glb_path)

@app.post("/generate-hotspots", response_model=SummarizationResponse)
async def generate_hotspots_endpoint(
    model_file: UploadFile = File(..., description="The 3D model file (GLB)."),
    pdf_file: UploadFile = File(..., description="The product brochure PDF."),
    part_names_json: str = Form(..., description="A JSON string array of part names from the 3D model."),
):
    """
    The main endpoint that accepts a PDF and 3D model part names, returning
    a structured list of marketing features mapped to those parts.
    """
    if not hotspot_generator:
        raise HTTPException(status_code=503, detail="API is not configured properly. Missing API Key.")
    
    logger.info(f"Received request for PDF file: {pdf_file.filename}")
    logger.info(f"Received model file: {model_file.filename}")
    logger.info(f"Received part_names_json: {part_names_json}")

    # 1. Read and validate inputs from the frontend request
    try:
        pdf_bytes = await pdf_file.read()
        part_names = json.loads(part_names_json)
        if not isinstance(part_names, list) or not all(isinstance(p, str) for p in part_names):
            raise ValueError("part_names_json is not a valid JSON list of strings.")
    except Exception as e:
        logger.error(f"Invalid input provided: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid input: {e}")

    logger.info("Input validation successful. Proceeding with PDF processing.")

    # 2. Process the PDF to get clean text (delegated to our processor module)
    logger.info("Step 1: Extracting text and tables from PDF.")
    temp_pdf_path = None
    try:
        # Save the uploaded PDF to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(pdf_bytes)
            temp_pdf_path = tmp.name

        brochure_text = extract_text_from_pdf(temp_pdf_path)
        tables_with_position = extract_tables_from_pdf(temp_pdf_path)

        # Combine text and tables. For simplicity, append tables to the end of the text.
        # A more sophisticated approach might interleave them based on position.
        combined_content = brochure_text
        for table_info in tables_with_position:
            combined_content += "\n" + table_info["content"]

        if not combined_content:
            logger.error("Failed to extract any content from the PDF.")
            raise HTTPException(status_code=500, detail="Could not extract content from the uploaded PDF.")

    finally:
        if temp_pdf_path and os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)

    brochure_text = clean_extracted_text(combined_content)
    logger.info("PDF text extraction and cleaning complete.")

    # Define output directory and create if it doesn't exist
    output_dir = "C:\\project\\Brochure2Model\\satori_backend\\output"
    os.makedirs(output_dir, exist_ok=True)

    # Generate a timestamp for unique filenames
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

    # Save cleaned plaintext
    plaintext_filename = os.path.join(output_dir, f"cleaned_plaintext_{timestamp}.txt")
    with open(plaintext_filename, "w", encoding="utf-8") as f:
        f.write(brochure_text)
    logger.info(f"Cleaned plaintext saved to {plaintext_filename}")

    # 3. Generate hotspots using the Gemini model (delegated to our generator module)
    logger.info(f"Step 2: Generating hotspots for {len(part_names)} parts.")
    hotspots_data = hotspot_generator.generate_hotspots_from_text(brochure_text, part_names)

    # Save Gemini model output JSON
    gemini_output_filename = os.path.join(output_dir, f"gemini_output_{timestamp}.json")
    with open(gemini_output_filename, "w", encoding="utf-8") as f:
        json.dump(hotspots_data, f, indent=4)
    logger.info(f"Gemini output saved to {gemini_output_filename}")

    # Ensure each hotspot has an ID and map marketing_summary to feature_description
    for hotspot in hotspots_data:
        if "id" not in hotspot:
            hotspot["id"] = str(uuid.uuid4())
        hotspot["feature_description"] = hotspot["marketing_summary"]

    if not hotspots_data:
        logger.warning("Gemini did not return any valid hotspots. Returning an empty list.")

    logger.info("Successfully processed request.")
    return SummarizationResponse(hotspots=hotspots_data, key_selling_points=[])

@app.post("/log-frontend-message")
async def log_frontend_message(message: dict):
    """
    Receives log messages from the frontend and prints them to the backend terminal.
    """
    log_level = message.get("level", "info").lower()
    log_content = message.get("content", "")
    
    if log_level == "debug":
        logger.debug(f"Frontend Debug: {log_content}")
    elif log_level == "info":
        logger.info(f"Frontend Info: {log_content}")
    elif log_level == "warn":
        logger.warning(f"Frontend Warn: {log_content}")
    elif log_level == "error":
        logger.error(f"Frontend Error: {log_content}")
    else:
        logger.info(f"Frontend Log: {log_content}")
    
    return {"status": "success"}
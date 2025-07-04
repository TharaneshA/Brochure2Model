import os
import json
import logging
import os
import uuid
from typing import Dict, List, Any
import google.generativeai as genai
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class HotspotGenerator:
    """
    A class to handle interaction with the Gemini API for generating
    product feature hotspots from brochure text.
    """
    def __init__(self):
        # Load environment variables from a .env file
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key or api_key == "YOUR_API_KEY_HERE":
            raise ValueError("GEMINI_API_KEY is not set or is a placeholder. Please check your .env file.")

        genai.configure(api_key=api_key)

        # Initialize the Gemini model. 'gemini-2.0-flash-lite' is fast and supports JSON mode.
        self.model = genai.GenerativeModel('gemini-2.0-flash-lite')
        logger.info("HotspotGenerator initialized with Gemini model.")

    def _create_mapping_prompt(self, brochure_text: str, part_names: List[str]) -> str:
        """
        Creates the detailed, structured prompt to instruct Gemini to act as a
        marketing and 3D mapping expert.
        """
        return f"""
You are an expert automotive marketing analyst and 3D technical artist for Satori XR.
Your task is to analyze a car brochure's text and map its key selling points to a specific list of parts from a 3D model.

**CONTEXT:**
1.  **Brochure Text:** The following is the full text extracted from a product brochure.
    ---
    {brochure_text}
    ---

2.  **3D Model Part Names:** The 3D model contains the following named parts. You MUST map features to one of these exact names, don't repeat part names.
    ```json
    {json.dumps(part_names, indent=2)}
    ```

**INSTRUCTIONS:**
1.  Read the entire brochure text to understand the car's main features.
2.  Identify up to 8 of the most compelling and marketable features described.
3.  For each feature, determine which of the provided "3D Model Part Names" is the most logical anchor point for a hotspot.
4.  For each feature, create a short, catchy `feature_title` and a compelling one-sentence `marketing_summary`.
5.  You MUST respond with ONLY a valid JSON object. The root of the object must be a key named `hotspots` which contains a list of the feature objects you identified.
6.  If a feature cannot be reasonably mapped to any part in the list, omit it from the output.

**REQUIRED JSON OUTPUT FORMAT:**
```json
{{
  "hotspots": [
    {{
      "feature_title": "Example: Panoramic Sunroof",
      "marketing_summary": "Example: Enjoy breathtaking views and an open-air feeling with the expansive, edge-to-edge panoramic sunroof.",
      "matched_part_name": "roof_panel"
    }},
    {{
      "feature_title": "Example: Diamond-Cut Alloy Wheels",
      "marketing_summary": "Example: The stylish 17-inch diamond-cut alloy wheels provide a premium and sporty stance on the road.",
      "matched_part_name": "wheel_front_left"
    }}
  ]
}}
"""
    def generate_hotspots_from_text(self, brochure_text: str, part_names: List[str]) -> List[Dict[str, Any]]:
        """
        Uses Gemini to generate structured hotspot data.

        Args:
            brochure_text: The text extracted from the PDF.
            part_names: A list of mesh names from the 3D model.

        Returns:
            A list of hotspot dictionaries with required fields, or an empty list on failure.
        """
        if not brochure_text:
            logger.warning("Brochure text is empty. Cannot generate hotspots.")
            return []

        prompt = self._create_mapping_prompt(brochure_text, part_names)

        try:
            logger.info("Sending request to Gemini API...")
            # Use Gemini's JSON mode for reliable, structured output
            response = self.model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )

            logger.info("Received response from Gemini API.")
            logger.info(f"Gemini API token usage: {response.usage_metadata.total_token_count} tokens")
            # The response.text should be a valid JSON string
            summary_data = json.loads(response.text)

            # Save Gemini response to a file for debugging
            output_dir = "./output"
            os.makedirs(output_dir, exist_ok=True)
            output_file_path = os.path.join(output_dir, "gemini_response.json")
            with open(output_file_path, "w") as f:
                json.dump(summary_data, f, indent=2)
            logger.info(f"Gemini response saved to {output_file_path}")

            # Validate the structure of the response
            if "hotspots" in summary_data and isinstance(summary_data["hotspots"], list):
                hotspots = summary_data["hotspots"]
                logger.info(f"Successfully generated and parsed {len(hotspots)} hotspots.")
                
                # Ensure all required fields are present and valid
                valid_hotspots = []
                for h in hotspots:
                    if not all(k in h for k in ["feature_title", "marketing_summary", "matched_part_name"]):
                        logger.warning(f"Hotspot missing required fields: {h}")
                        continue
                    if h.get("matched_part_name") not in part_names:
                        logger.warning(f"Hotspot mapped to invalid part name: {h['matched_part_name']}")
                        continue
                    
                    # Add unique ID for each hotspot
                    h["id"] = str(uuid.uuid4())
                    valid_hotspots.append(h)
                
                if len(valid_hotspots) < len(hotspots):
                    logger.warning(f"Filtered out {len(hotspots) - len(valid_hotspots)} invalid hotspots.")
                return valid_hotspots
            else:
                logger.error("Gemini response was valid JSON but lacked the 'hotspots' list.")
                return []

        except Exception as e:
            logger.error(f"An error occurred with the Gemini API or JSON parsing: {e}", exc_info=True)
            return []
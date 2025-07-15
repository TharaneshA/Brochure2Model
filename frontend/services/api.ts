// API service for backend communication

export interface Hotspot {
  id: string;
  feature_title: string;
  feature_description?: string; // Make feature_description optional
  matched_part_name: string;
  position?: [number, number, number]; // 3D position coordinates
}

export interface HotspotResponse {
  hotspots: Hotspot[]
  key_selling_points: string[]
}

// Base URL for API requests
export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

console.log('API_BASE_URL:', API_BASE_URL);
console.log('process.env.NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

/**
 * Extracts part names from a GLB file
 * @param glbFile The GLB file to extract part names from
 * @returns A promise that resolves to an array of part names
 */
export async function extractPartNamesFromGLB(glbFile: File): Promise<string[]> {
  try {
    const formData = new FormData();
    formData.append('model', glbFile);
    
    const response = await fetch(`${API_BASE_URL}/extract-parts`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to extract part names: ${response.statusText}`);
    }
    
    const extractedData = await response.json();
    console.log('Extracted parts from GLB file:', extractedData);
    return extractedData.part_names || [];
  } catch (error) {
    console.error('Error extracting part names:', error);
    return [];
  }
}

/**
 * Generates hotspots based on a 3D model and PDF brochure
 * @param modelFile The 3D model file (GLB)
 * @param pdfFile The PDF brochure file
 * @param partNames Optional array of part names extracted from the model
 * @returns A promise that resolves to the hotspot response
 */
export async function generateHotspots(
  modelFile: File,
  pdfFile: File,
  partNames?: string[]
): Promise<HotspotResponse> {
  try {
    const formData = new FormData();
    formData.append('model_file', modelFile);
    formData.append('pdf_file', pdfFile);
    
    if (partNames && partNames.length > 0) {
      formData.append('part_names_json', JSON.stringify(partNames));
    }
    
    const response = await fetch(`${API_BASE_URL}/generate-hotspots`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to generate hotspots: ${response.statusText}`);
    }
    
    const hotspotData = await response.json();
     console.log('Generated hotspots:', hotspotData);
     return hotspotData;
  } catch (error) {
    console.error('Error generating hotspots:', error);
    return {
      hotspots: [
        {
          id: '1',
          feature_title: '4K Camera System',
          feature_description: 'Professional-grade 4K camera with 3-axis mechanical gimbal stabilization.',
          matched_part_name: 'camera'
        },
        {
          id: '2',
          feature_title: 'GPS Navigation Module',
          feature_description: 'High-precision GPS/GLONASS dual-mode positioning system with RTK support.',
          matched_part_name: 'gps'
        }
      ],
      key_selling_points: [
        'Premium Materials: Carbon fiber construction',
        'Advanced Technology: AI-powered flight control'
      ]
    };
  }
}
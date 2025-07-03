# 🚗 **Brochure2Model: AI-Powered 3D Product Visualizer**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-green?logo=three.js)](https://threejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)](https://www.python.org/)

**Brochure2Model** is an innovative web application that transforms static product brochures into dynamic, interactive 3D experiences. By leveraging the power of Google's Gemini LLM, it automatically reads a PDF brochure, extracts key marketing features, and intelligently maps them as interactive hotspots onto a corresponding 3D model.

This tool is designed for marketing teams, product managers, and sales professionals to create stunning, web-based product showcases with minimal effort.

![image](https://github.com/user-attachments/assets/ce5fff1d-864e-42ae-8aa2-c2a394d3b78c)

---

## ✨ **Key Features**

- **🤖 AI-Powered Analysis**: Uses Google Gemini to understand the content of a PDF brochure and identify key selling points.
- **📍 Automatic Hotspot Generation**: Intelligently maps extracted features to the most relevant parts of your uploaded 3D model.
- **🌐 Interactive 3D Viewer**: A smooth, high-performance 3D viewer built with React Three Fiber, allowing users to orbit, pan, and zoom around the model.
- **💡 Rich User Experience**: Clickable hotspots on the model and in a side panel reveal detailed marketing summaries, creating an engaging user journey.
- **🚀 Modern Tech Stack**: Built with Next.js for the frontend and a high-performance FastAPI backend, ensuring a scalable and maintainable architecture.
- **🎨 Sleek, Professional UI**: A clean, dark-themed interface designed for a professional and immersive experience.

---

## 🛠️ **Tech Stack**

### **Frontend** (`/frontend`)

- **Framework**: [Next.js](https://nextjs.org/) 14 (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API Communication**: [Axios](https://axios-http.com/)

### **Backend** (`/satori_backend`)

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: [Python](https://www.python.org/) 3.10+
- **LLM Integration**: [Google Generative AI SDK](https://github.com/google/generative-ai-python) (for Gemini)
- **PDF Processing**: [PyMuPDF](https://pymupdf.readthedocs.io/en/latest/)

---

## 🚀 **Getting Started**

Follow these instructions to get the project running on your local machine for development and testing purposes.

### **Prerequisites**

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [pnpm](https://pnpm.io/installation) (or npm/yarn)
- [Python](https://www.python.org/downloads/) (v3.10 or later)
- A **Google Gemini API Key**. Get yours from [Google AI Studio](https://makersuite.google.com/app/apikey).

---

### 1. **Backend Setup** (`/satori_backend`)

First, set up the Python backend server which handles the AI processing.

```bash
# 1. Navigate to the backend directory
cd satori_backend

# 2. Create a Python virtual environment
python -m venv venv

# 3. Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# 4. Install the required dependencies
pip install -r requirements.txt

# 5. Create a .env file from the example
# In this file, add your Gemini API Key
# For example: GEMINI_API_KEY="AIzaSy...your...key..."
cp .env.example .env

# 6. Start the FastAPI server
uvicorn main:app --reload
```
The backend API will now be running at http://127.0.0.1:8000. You can view the interactive API documentation at http://127.0.0.1:8000/docs.

### 2. **Frontend Setup** (`/frontend`)

Next, set up the Next.js frontend application.

```bash
# 1. Open a new terminal and navigate to the frontend directory
cd frontend

# 2. Install dependencies using pnpm (recommended)
pnpm install

# 3. Start the development server
pnpm run dev
```

##💡 Usage
Open the application in your browser (http://localhost:3000).

Click "Upload 3D Model (.glb)" and select a .glb or .gltf file.

Click "Upload Brochure (.pdf)" and select the corresponding PDF document.

Once both files are selected, the "Generate Hotspots" button will become active. Click it.

Wait a few moments while the backend processes the PDF and communicates with the Gemini API.

The 3D model will appear with interactive hotspots. Click on a hotspot or an item in the left-hand list to see the AI-generated marketing summary.

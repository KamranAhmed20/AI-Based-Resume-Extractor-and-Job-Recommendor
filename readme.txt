============================================================
CV Parser and Job Recommender System – Project Guide
============================================================

------------------------------------------------------------
PROJECT OVERVIEW
------------------------------------------------------------
This project allows users to:
- Upload their CV
- Automatically parse resume content
- Get job recommendations based on their skills
- Scrape real job listings from the internet using a web crawler
- View job matches on a modern frontend UI

Technologies Used:
- Frontend: React + Vite + Tailwind CSS + Supabase
- Backend: FastAPI + Scrapy + Selenium + scikit-learn + pandas

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------
The project folder contains two main subfolders:

📁 frontend/     ← React + Tailwind + Supabase  
📁 backend/      ← FastAPI + ML + Scraping logic

✅ IMPORTANT:
To run the project smoothly, **open the entire project folder in VS Code** (i.e., the root folder that contains both `frontend` and `backend`).

You will need to open **two terminals** — one for frontend and one for backend — inside VS Code.

------------------------------------------------------------
HOW TO RUN THE PROJECT
------------------------------------------------------------

REQUIREMENTS:
- Python 3.8+
- Node.js and npm
- Chrome Browser (for Selenium)
- ChromeDriver installed and in PATH

============================================================
STEP 1: BACKEND SETUP (FastAPI + ML + Scraping)
============================================================

1. In Terminal 1, navigate to the backend directory:
   > cd backend

2. Create and activate a virtual environment:
   > python -m venv venv  
   > .\venv\Scripts\activate        (on Windows)  
   > source venv/bin/activate      (on Linux/macOS)

3. Install all required packages:
   > pip install -r requirements.txt

4. Run the FastAPI backend server:
   > uvicorn app.main:app --reload

📡 The backend will run at:
http://localhost:8000


============================================================
STEP 2: FRONTEND SETUP (React + Tailwind + Supabase)
============================================================

1. In Terminal 2, navigate to the frontend directory:
   > cd frontend

2. Install frontend dependencies:
   > npm install

3. Start the React development server:
   > npm run dev

🌐 The frontend will run at:
http://localhost:5173


------------------------------------------------------------
NOTES:
------------------------------------------------------------
- Keep both frontend and backend terminals running while using the app.
- Supabase handles user authentication in the frontend.
- Job recommendations are generated based on parsed CV content and live job scraping.
- Supported resume formats: PDF, DOCX

------------------------------------------------------------
Support
------------------------------------------------------------
📧 If you're facing any issue, feel free to contact for help:  
kamranahmed7602@gmail.com

------------------------------------------------------------
THANK YOU!
------------------------------------------------------------
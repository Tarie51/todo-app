# Muzukuru – Full-Stack To-Do Application

A full‑stack To-Do application built for the **Muzukuru Computer Science Competency Test**.  
Backend: Python 3 (Flask or FastAPI), Frontend: React 18 + TypeScript.

---

## 📌 Objective
Build a full‑stack To‑Do app that:
- Lets users **register** and **log in**.
- Uses a **protected route** accessed only with a valid token.
- Stores and retrieves data over a network (REST API).

---

## 🛠️ Tech Stack

### Backend (Python 3)
- Framework: **Flask** or **FastAPI** (Python 3.8+).  
- Endpoints:
  - `POST /register` – create user accounts with secure credential storage.  
  - `POST /login` – authenticate users and return a mocked JWT/token.  
  - `GET /protected` – verify token authenticity.  
- Security:  
  - Uses `Authorization: Bearer <token>` header on protected endpoints.  
- Logging:  
  - Logs requests and errors to `app.log` using Python’s `logging` module.  
- CORS:  
  - Enabled for `http://localhost:3000`.

### Frontend (React + TypeScript)
- Framework: **React 18+** with **TypeScript**.  
- Pages:
  - **Registration Page** – form for `POST /register`.  
  - **Login Page** – form for `POST /login`, stores token and redirects to protected route.  
  - **Protected Route** – page for authenticated users, confirms access via `GET /protected`.  
  - **Logout** – clears token and redirects to login page.  
- State: Uses `useState`, `useEffect`, and strict TypeScript typing (no `any`).  
- UX:
  - Shows loading states (spinner) and error messages (e.g., “Invalid credentials”).  
- Styling:
  - Minimal, responsive styling using plain CSS or Tailwind.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### 1. Clone the repo
```bash
git clone https://github.com/tarie51/todo-app.git
cd <todo-app>
```

### 2. Run the backend (Python)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/macOS
# or venv\Scripts\activate  # Windows

pip install -r requirements.txt
python main.py   # or app.py, depending on your file
```
Backend runs on `http://localhost:8000` (or similar).

### 3. Run the frontend (React + TypeScript)
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`.




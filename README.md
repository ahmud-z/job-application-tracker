# Job Application Tracker

A full-stack web application that helps users organize and track job applications in one place.  
Users can add, update, search, filter, and manage their applications efficiently.

---

## Architecture
React Frontend → Express API → MongoDB Database  
JWT Authentication for protected routes

---

## Project Preview

<img width="1053" height="891" alt="Screenshot_13" src="https://github.com/user-attachments/assets/132ebc13-d48d-4e0f-b91f-fe880e0abe26" />
<img width="1056" height="642" alt="Screenshot_12" src="https://github.com/user-attachments/assets/9d37ca83-d313-40e1-a972-f40ae942d90d" />
<img width="1055" height="899" alt="Screenshot_10" src="https://github.com/user-attachments/assets/20a2b8a6-ffae-490b-bc55-4bd21be081a1" />
<img width="1058" height="901" alt="Screenshot_9" src="https://github.com/user-attachments/assets/ba596b05-fe86-441e-9ae8-817358e76ec3" />

---

## Features

- Add new job applications
- Search applications by company name
- Filter applications by application status
- Sort applications by date and company name
- Edit or update existing applications
- Delete applications

---

## Live Demo
Frontend: https://job-application-tracer.vercel.app/  
Backend API: https://job-application-tracker-vrbh.onrender.com/applications/

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt Encryption

### Deployment
- Vercel
- Render

---

## Getting Started

### 1. Clone the repository
git clone https://github.com/ahmud-z/job-application-tracker.git

### 2. Navigate to the project folder
cd job-application-tracker

### 3. Setup Backend
cd backend
npm install

Create a `.env` file in the backend folder and add the required environment variables.

Run the backend server:
npm run dev

### 4. Setup Frontend
cd frontend
npm install

Run the frontend development server:
npm run dev

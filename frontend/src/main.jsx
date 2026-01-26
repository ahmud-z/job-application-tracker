import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import ApplicationForm from './components/ApplicationForm.jsx';
import App from './App.jsx';
import EditApplicationForm from './components/EditApplicationForm.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-application" element={<ApplicationForm />} />
        <Route path="/edit-application/:id" element={<EditApplicationForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import RegisterPage from './components/RegisterPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import DashboardPage from './components/DashboardPage.jsx'
import CreateApplication from './components/CreateApplication.jsx'
import EditApplication from './components/EditApplication.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-application" element={<CreateApplication />} />
        <Route path="/edit-application/:id" element={<EditApplication />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ProjectPage from './pages/ProjectPage.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import { TrailCursor } from './components/TrailCursor.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TrailCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

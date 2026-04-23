import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Menggunakan lazy loading agar file hanya diunduh saat dibutuhkan
const ClassroomApp = lazy(() => import('./App3'))
const DefaultApp = lazy(() => import('./App2'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Suspense wajib ada saat menggunakan lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Rute untuk /classroom */}
          <Route path="/classroom" element={<ClassroomApp />} />
          
          {/* Rute default (index) atau rute lain */}
          <Route path="/" element={<DefaultApp />} />
          
          {/* Opsional: Rute 404 jika halaman tidak ditemukan */}
          <Route path="*" element={<DefaultApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)
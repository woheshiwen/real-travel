import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Community from './pages/Community'
import Landing from './pages/Landing'
import Plan from './pages/Plan'
import Trip from './pages/Trip'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/trip/xian" element={<Trip />} />
        <Route path="/community" element={<Community />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

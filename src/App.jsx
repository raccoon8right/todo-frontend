import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Tareas from './pages/Tareas'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tareas" element={<ProtectedRoute><Tareas /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

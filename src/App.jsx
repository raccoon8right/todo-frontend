import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Tareas from './pages/Tareas'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tareas" element={<ProtectedRoute><Tareas /></ProtectedRoute>} />
      </Routes>
    </HashRouter>
  )
}

export default App

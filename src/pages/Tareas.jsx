import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Title from '../components/Title'

function Tareas() {

    const [tareas, setTareas] = useState([])

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const [tareaEditado, setTareaEditado] = useState(null)
    const [tituloEditado, setTituloEditado] = useState('')
    const [descripcionEditado, setDescripcionEditado] = useState('')

    const { token, setToken } = useContext(AuthContext)

    const navigate = useNavigate()

    async function mostrarTareas() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tareas`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        setTareas(data)
    }

    async function crearTareas() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, descripcion })
        })
        const data = await response.json()
        mostrarTareas()
        setTitulo('')
        setDescripcion('')
    }

    async function eliminarTarea(id) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tareas/` + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        mostrarTareas()
    }

    async function editarTarea(id) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tareas/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titulo: tituloEditado, descripcion: descripcionEditado, completada: false })
        })
        setTareaEditado(null)
        mostrarTareas()
    }

    async function toggleCompletada(tarea) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tareas/` + tarea.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titulo: tarea.titulo, descripcion: tarea.descripcion, completada: !tarea.completada })
        })
        mostrarTareas()
    }

    function activarEdicion(tarea) {
        setTareaEditado(tarea.id)
        setTituloEditado(tarea.titulo)
        setDescripcionEditado(tarea.descripcion)
    }

    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        navigate('/')
    }

    useEffect(() => {
        mostrarTareas()
    }, [])

    return (
        <div className='min-h-screen bg-gray-900 p-8'>
            <div className='max-w-2xl mx-auto'>
                <Title title='Mis Tareas' />
                <button onClick={logout} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mb-6 transition-colors'>Cerrar sesión</button>
                {tareas.map((tarea) => (
                    <div key={tarea.id} className='bg-gray-800 p-4 rounded-lg mb-3 flex justify-between items-center'>
                        {tareaEditado === tarea.id ? (
                            <>
                                <input value={tituloEditado} onChange={(e) => setTituloEditado(e.target.value)} className='bg-gray-700 text-white rounded px-3 py-1 mr-2' />
                                <input value={descripcionEditado} onChange={(e) => setDescripcionEditado(e.target.value)} className='bg-gray-700 text-white rounded px-3 py-1 mr-2' />
                                <button onClick={() => editarTarea(tarea.id)} className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2'>Guardar</button>
                                <button onClick={() => setTareaEditado(null)} className='bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded'>Cancelar</button>
                            </>
                        ) : (
                            <>
                                <div className='flex items-center gap-3'>
                                    <input type='checkbox' checked={tarea.completada} onChange={() => toggleCompletada(tarea)} className='w-4 h-4 accent-purple-500' />
                                    <div>
                                        <p className={`font-semibold ${tarea.completada ? 'line-through text-gray-500' : 'text-white'}`}>{tarea.titulo}</p>
                                        <p className='text-gray-400 text-sm'>{tarea.descripcion}</p>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <button onClick={() => activarEdicion(tarea)} className='bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded'>Editar</button>
                                    <button onClick={() => eliminarTarea(tarea.id)} className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded'>Eliminar</button>
                                </div>
                            </>
                        )}

                    </div>
                ))}
                <div className='bg-gray-800 p-4 rounded-lg mt-6'>
                    <h2 className='text-white font-semibold mb-4'>Nueva tarea</h2>
                    <form onSubmit={(e) => { e.preventDefault(); crearTareas() }}>
                        <input type='text' placeholder='Titulo de la tarea' value={titulo} onChange={(e) => setTitulo(e.target.value)} className='w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:border-purple-500' />
                        <input type='text' placeholder='Descripción de la tarea' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className='w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:border-purple-500' />
                        <button type='submit' className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors'>Crear tarea</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Tareas
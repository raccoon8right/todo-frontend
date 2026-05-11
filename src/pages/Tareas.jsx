import { useState, useEffect } from 'react'
import Title from '../components/Title'

function Tareas() {

    const [tareas, setTareas] = useState([])

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const [tareaEditado, setTareaEditado] = useState(null)
    const [tituloEditado, setTituloEditado] = useState('')
    const [descripcionEditado, setDescripcionEditado] = useState('')

    async function mostrarTareas() {
        const token = localStorage.getItem('token') // Obtiene el token del localStorage
        const response = await fetch('http://localhost:3000/tareas', {
            headers: {
                'Authorization': `Bearer ${token}`  // Agrega el token al encabezado de autorización
            }
        })
        const data = await response.json()
        setTareas(data) // Actualiza el estado con las tareas obtenidas
    }

    async function crearTareas() {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, descripcion })
        })
        const data = await response.json()
        mostrarTareas() // Refresca la lista de tareas después de crear una nueva
    }

    async function eliminarTarea(id) {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/tareas/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        mostrarTareas() // Refresca la lista de tareas después de eliminar una tarea
    }

    async function editarTarea(id) {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/tareas/' + id, {
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

    function activarEdicion(tarea) {
        setTareaEditado(tarea.id)
        setTituloEditado(tarea.titulo)
        setDescripcionEditado(tarea.descripcion)
    }

    useEffect(() => {
        mostrarTareas()
    }, [])

    return (
        <>
            <Title title='Tareas' />
            {tareas.map((tarea) => (
                <div key={tarea.id}>
                    {tareaEditado === tarea.id ? (
                        <>
                            <input value={tituloEditado} onChange={(e) => setTituloEditado(e.target.value)} />
                            <input value={descripcionEditado} onChange={(e) => setDescripcionEditado(e.target.value)} />
                            <button onClick={() => editarTarea(tarea.id)}>Guardar</button>
                            <button onClick={() => setTareaEditado(null)}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <p>{tarea.titulo}</p>
                            <p>{tarea.descripcion}</p>
                            <button onClick={() => activarEdicion(tarea)}>Editar</button>
                            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                        </>
                    )}

                </div>
            ))}
            <h1>Crea tu tarea</h1>
            <form onSubmit={(e) => { e.preventDefault(); crearTareas() }}>
                <input type='text' placeholder='Titulo de la tarea' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <input type='text' placeholder='Descripción de la tarea' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <button type='submit'>CrearTarea</button>
            </form>
        </>
    )
}

export default Tareas
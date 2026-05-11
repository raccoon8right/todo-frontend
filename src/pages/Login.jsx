import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    /* funccion normal
    function handleSubmit(e) {
        e.preventDefault()
        console.log(email, password)
    }
    */
    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        //console.log(data)
        if (response.ok) {
            localStorage.setItem('token', data.token) // Guarda el token
            console.log('Login exitoso')
            navigate('/tareas') // Redirige a la página de tareas
        } else {
            console.log(data.mensaje)
        }
    }

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Iniciar sesión</button>
            </form>
        </>
    )
}

export default Login
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import Input from '../components/Input'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

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
            <Title title='Iniciar sesión' />
            <Form onSubmit={handleSubmit}>
                <Input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Iniciar sesión</button>
            </Form>
        </>
    )
}

export default Login
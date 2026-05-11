import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: name, email, password })
        })
        const data = await response.json()
        
        if (response.ok) {
            console.log('Registro exitoso')
            navigate('/')
        } else {
            console.log(data.mensaje)
        }
    }

    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Nombre...' value={name} onChange={(e) => setName(e.target.value)} />
                <input type='email' placeholder='Email...' value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Registrarse</button>
            </form>
        </>
    )
}

export default Register
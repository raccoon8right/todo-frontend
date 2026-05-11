import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import Input from '../components/Input'

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
            <Title title='Registrar usuario' />
            <Form onSubmit={handleSubmit}>
                <Input type='text' placeholder='Nombre...' value={name} onChange={(e) => setName(e.target.value)} />
                <Input type='email' placeholder='Email...' value={email} onChange={(e)=> setEmail(e.target.value)} />
                <Input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Registrarse</button>
            </Form>
        </>
    )
}

export default Register
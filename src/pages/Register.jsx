import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Title from '../components/Title'
import Form from '../components/Form'
import Input from '../components/Input'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('') // Limpiar errores anteriores
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
            setError(data.mensaje)
        }
    }

    return (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
            <div className='bg-gray-800 p-8 rounded-xl w-full max-w-md'>
                <Title title='Registrar usuario' />
                <Form onSubmit={handleSubmit}>
                    <Input type='text' placeholder='Nombre...' value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors'>Registrarse</button>
                </Form>
                <p className='text-gray-400 text-sm text-center mt-4'>
                    ¿Ya tienes cuenta?
                    <Link to='/' className='text-purple-400 hover:text-purple-300'> Inicia sesión</Link>
                </p>
                {error && <p className='text-red-400 text-sm mt-2 text-center'>{error}</p>}
            </div>
        </div>
    )
}

export default Register
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import Title from '../components/Title'
import Form from '../components/Form'
import Input from '../components/Input'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [error, setError] = useState('')

    const { setToken } = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            console.log('Login exitoso')
            navigate('/tareas')
        } else {
            setError(data.mensaje)
        }
    }

    return (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
            <div className='bg-gray-800 p-8 rounded-xl w-full max-w-md'>
                <Title title='Iniciar sesión' />
                <Form onSubmit={handleSubmit}>
                    <Input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' placeholder='Contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors'>Iniciar sesión</button>
                </Form>
                <p className='text-gray-400 text-sm text-center mt-4'>
                    ¿No tienes cuenta?
                    <Link to='/register' className='text-purple-400 hover:text-purple-300'> Regístrate</Link>
                </p>
                {error && <p className='text-red-400 text-sm mt-2 text-center'>{error}</p>}
            </div>
        </div>
    )
}

export default Login
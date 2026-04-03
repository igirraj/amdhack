/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { token, setToken, loadUserProfileData } = useContext(AppContext)
    const navigate = useNavigate()
    const [state, setState] = useState('Sign Up')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (state === 'Sign Up') {
            const newUser = {
                name,
                email,
                phone: '',
                address: { line1: '', line2: '' },
                gender: 'Male',
                dob: '',
                image: 'https://i.pravatar.cc/150?u=' + email
            }
            localStorage.setItem('userData', JSON.stringify(newUser))
            localStorage.setItem('token', 'static-token-' + Date.now())
            setToken(localStorage.getItem('token'))
            loadUserProfileData()
            toast.success('Account created successfully!')
        } else {
            const stored = localStorage.getItem('userData')
            if (stored && JSON.parse(stored).email === email) {
                const tok = 'static-token-' + Date.now()
                localStorage.setItem('token', tok)
                setToken(tok)
                loadUserProfileData()
                toast.success('Logged in successfully!')
            } else {
                toast.error('Invalid credentials. Please sign up first.')
            }
        }
    }

    useEffect(() => {
        if (token) navigate('/')
    }, [token])

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-5 m-auto items-start p-10 min-w-[340px] sm:min-w-96 neo-card bg-neo-yellow border-4 border-black text-black text-sm uppercase font-bold tracking-wide'>
                <p className='text-2xl font-semibold'>
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </p>
                <p>Please {state === 'Sign Up' ? "Create Account" : "Login"} to book appointment</p>

                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input className='border-2 border-black w-full p-2 mt-1 focus:outline-none focus:ring-0 shadow-[2px_2px_0_0_#000]' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                )}

                <div className='w-full'>
                    <p>Email</p>
                    <input className='border-2 border-black w-full p-2 mt-1 focus:outline-none focus:ring-0 shadow-[2px_2px_0_0_#000]' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input className='border-2 border-black w-full p-2 mt-1 focus:outline-none focus:ring-0 shadow-[2px_2px_0_0_#000]' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </div>

                <button type='submit' className='neo-btn bg-black text-white w-full py-4 text-base mt-4'>
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </button>

                {state === 'Sign Up' ? (
                    <p>Already have an account? <span onClick={() => setState('Login')} className='bg-white px-2 py-1 border-2 border-black cursor-pointer shadow-neo'>Login here</span></p>
                ) : (
                    <p>Create an account? <span onClick={() => setState('Sign Up')} className='bg-white px-2 py-1 border-2 border-black cursor-pointer shadow-neo'>Click here</span></p>
                )}
            </div>
        </form>
    )
}

export default Login
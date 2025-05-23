import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import { toast } from 'react-toastify'

export const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registered, setRegistered] = useState(false)

    const navigate = useNavigate()


    const apiUrl = import.meta.env.VITE_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await axios.post(`${apiUrl}/auth/register`, {
                firstName,
                lastName,
                username,
                email,
                password
            })

            if (response.status === 201) {
                setRegistered(true)
                toast.success('Registration successful! Please sign in.')
                setFirstName('')
                setLastName('')
                setEmail('')
                setUsername('')
                setPassword('')
                navigate('/signin')
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    toast.error('Username or email already exists.')
                } else if (error.response.status === 400) {
                    toast.warn('Invalid input.')
                } else {
                    toast.error('Registration failed.')
                }
            } else {
                toast.error('Network error.')
            }
        }
    }

    if(registered) {
        return (
            <div className='registeredContainer'>
                <p>Welcome! Please sign in to start share and save your travels! <Link to="/signin">Sign in!</Link> </p>
            </div>
        )
    }

    return (
        <div className='registerContainer'>
            <h2> Welcome! </h2>
            <form onSubmit={handleSubmit}>

                <div className="nameRow">
                <input
                    type='text'
                    placeholder='Firstname*'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className='nameInput'
                />
                <input
                    type='text'
                    placeholder='Lastname*'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className='nameInput'
                />
                </div>



                <input
                    type='text'
                    placeholder='Username*'
                    value={username}
                    minLength={3}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type='email'
                    placeholder='Email*'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type='password'
                    placeholder='Password*'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={10}
                    maxLength={256}
                    required
                />

                <button type='submit'>Register</button>
            </form>

            <p>Already have an account? <Link to="/signin">Sign in!</Link> </p>

        </div>
    )

}

export default Register 
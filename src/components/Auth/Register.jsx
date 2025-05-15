import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Auth.css'

export const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [registered, setRegistered] = useState(false)


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
                setError('')
                // Optional: Clear the form
                setFirstName('')
                setLastName('')
                setEmail('')
                setUsername('')
                setPassword('')
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setError('Username and/or email is already registered.')
                } else if (error.response.status === 400) {
                    setError('Invalid input. Please check your information.')
                } else {
                    setError('Registration failed. Please try again later.')
                }
            } else {
                setError('Network error. Please check your connection.')
            }
            setSuccess('')


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
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Firstname'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Lastname'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <small>Username must start with a letter and contain 3–256 characters.</small>

                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={10}
                    maxLength={256}
                    required
                />
                <small>Password must be at least 10 characters.</small>

                <button type='submit'>Register</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

            </form>

        </div>
    )







}

export default Register
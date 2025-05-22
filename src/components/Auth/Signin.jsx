import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { toast } from 'react-toastify'


export const Signin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const signIn = useSignIn()
    const isAuthenticated = useIsAuthenticated()

    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await axios.post(`${apiUrl}/auth/signin`, {
                username,
                password
            })


            const success = signIn({
                auth: {
                    token: response.data.access_token,
                    type: "Bearer"
                },
                expiresIn: 60,
                userState: {
                    firstName: response.data.user.firstName,
                    lastName: response.data.user.lastName,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    userId: response.data.user.id,
                },
                refreshToken: response.data.refresh_token,
                refreshTokenExpireIn: 1440
            })



            if (success) {
                toast.success('Sign in successful! Welcome.')
                navigate('/travels')
                return
            } else {
                setError('Login failed. Please try again.')
            }





        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    //setError('False username and/or password.')
                    toast.error('False username and/or password.')
                } else if (error.response.status === 400) {
                    //setError('Invalid input. Please check your information.')
                    toast.warn('Invalid input. Please check your information.')
                } else {
                    //setError('Login failed. Please try again later.')
                    toast.error('Login failed. Please try again later.')
                }
            } else {
                //setError('Network error. Please check your connection.')
                toast.error('Network error. Please check your connection.')

            }

        }
    }

    if (isAuthenticated) {
        return (
            <div> <p>You did it! Welcome! Start saving and share your travels!</p> </div>
        )
    }



    return (
        <div className='siginContainer'>
            <form onSubmit={handleSubmit}>
                <h2> Welcome back! </h2>
                {error && <p className="error-text">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={10}
                    maxLength={256}
                    required
                />

                <button type='submit'>Sign in!</button>

            </form>

            <p>New here? Please register to start share and save your travels! <Link to="/register">Register!</Link> </p>
        </div>
    )


}

export default Signin
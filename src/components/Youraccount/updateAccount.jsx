import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import './Youraccount.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const AccountForm = () => {
    const authHeader = useAuthHeader()
    const authUser = useAuthUser()
    const navigate = useNavigate()
    const signIn = useSignIn()

    const apiUrl = import.meta.env.VITE_API_URL

    if (!authUser) {
        return <div className="container">You are not logged in.</div>
    }

    const { firstName: currentFirstName, lastName: currentLastName, email: currentEmail, username: currentUsername } = authUser

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedUser = {}
        if (firstName && firstName !== currentFirstName) updatedUser.firstName = firstName
        if (lastName && lastName !== currentLastName) updatedUser.lastName = lastName
        if (username && username !== currentUsername) updatedUser.username = username
        if (email && email !== currentEmail) updatedUser.email = email

        if (Object.keys(updatedUser).length === 0) {
            toast.info('No changes to update')
            return
        }

        try {
            const response = await axios.patch(
                `${apiUrl}/auth/update`,
                updatedUser,
                {
                    headers: {
                        'Authorization': authHeader
                    }
                }
            )

            if(response.status===200){signIn({
                auth: {
                    token: authHeader.replace('Bearer ', ''),
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
                refreshToken: ' ',
                refreshTokenExpireIn: 1440
            })
}
            toast.success('Account updated successfully')
            setTimeout(() => navigate('/account'), 1000)
        } catch (error) {
            console.error(error)
            toast.error('Failed to update account' )
        }
    }


    return (
        <div className='container'>
            <Link to="/account" className="back-button">← Back to Account</Link>

            <form onSubmit={handleSubmit}>
                <div className="nameRow">
                    <input
                        type="text"
                        placeholder={currentFirstName}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="nameInput"
                    />
                    <input
                        type="text"
                        placeholder={currentLastName}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="nameInput"
                    />
                </div>

                <input
                    type="text"
                    placeholder={currentUsername}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder={currentEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default AccountForm

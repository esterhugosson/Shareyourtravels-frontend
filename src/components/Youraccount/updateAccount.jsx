import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import './Youraccount.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

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

        try {
            const updatedUser = {
                firstName: firstName || currentFirstName,
                lastName: lastName || currentLastName,
                username: username || currentUsername,
                email: email || currentEmail,
            }

            await axios.patch(
                `${apiUrl}/auth/update`,
                updatedUser,
                {
                    headers: {
                        'Authorization': authHeader,
                        'Content-Type': 'application/json'
                    }
                }
            )

            // After successful patch
            signIn({
                token: authUser.token,
                expiresIn: 3600, // or your expiration time
                tokenType: 'Bearer',
                authState: {
                    ...authUser,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    username: updatedUser.username,
                    email: updatedUser.email
                }
            })



            toast.success('Account updated successfully')
            navigate(0) // reload page to reflect changes (or you can refresh auth state if supported)
        } catch (error) {
            toast.error('Failed to update account')
        }
    }

    return (
        <div className='container'>
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

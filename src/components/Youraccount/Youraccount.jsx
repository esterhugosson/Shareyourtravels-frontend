import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import './Youraccount.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Youraccount = () => {

    const authUser = useAuthUser()
    const authHeader = useAuthHeader()
    const navigate = useNavigate()
    const signOut = useSignOut()
    const apiUrl = import.meta.env.VITE_API_URL

    // Defensive check in case authUser is null (e.g., before login or on logout)
    if (!authUser) {
        return <div className="container">You are not logged in.</div>;
    }

    const { firstName, lastName, email, username } = authUser


     const handleDeleteClick = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account?")
        if (!confirmed) return

        try {
            await axios.delete(`${apiUrl}/auth/delete/`,
                {headers: { 'Authorization': authHeader}}
            )
            toast.success("Account deleted successfully")

            signOut()
            navigate('/home') 
        } catch (error) {
            toast.error("Failed to delete account")
        }
    }



    return (
         <div className='container'>
            <h2>Your Account</h2>



                    <ul>
                        <li><strong>First Name:</strong> {firstName}</li>
                        <li><strong>Last Name: </strong>{lastName}</li>
                        <li><strong>Username: </strong>{username}</li>
                        <li><strong>Email:</strong> {email}</li>
                    </ul>
                    <button><Link to="/edit" >Update </Link></button>
                    <button className='button-delete' onClick={handleDeleteClick}>Delete</button>
            
        </div>
     )
}

export default Youraccount
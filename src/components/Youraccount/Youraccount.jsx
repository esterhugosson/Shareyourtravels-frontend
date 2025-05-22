import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import './Youraccount.css'
import { useState } from 'react'
import { AccountForm } from './updateAccount'

export const Youraccount = () => {

    const authUser = useAuthUser()
    const [showForm, setShowForm] = useState(false)

    // Defensive check in case authUser is null (e.g., before login or on logout)
    if (!authUser) {
        return <div className="container">You are not logged in.</div>;
    }

    const { firstName, lastName, email, username } = authUser;

    return (
         <div className='container'>
            <h2>Your Account</h2>

            {!showForm ? (
                <>
                    <ul>
                        <li><strong>First Name:</strong> {firstName}</li>
                        <li><strong>Last Name: </strong>{lastName}</li>
                        <li><strong>Username: </strong>{username}</li>
                        <li><strong>Email:</strong> {email}</li>
                    </ul>
                    <button onClick={() => setShowForm(true)}>Update</button>
                    <button>Delete</button>
                </>
            ) : (
                <AccountForm onCancel={() => setShowForm(false)} />
            )}
        </div>
     )
}

export default Youraccount
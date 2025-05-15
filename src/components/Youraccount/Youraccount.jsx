import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import './Youraccount.css'

export const Youraccount = () => {

    const authUser = useAuthUser()

    // Defensive check in case authUser is null (e.g., before login or on logout)
    if (!authUser) {
        return <div className="container">You are not logged in.</div>;
    }

    const { firstName, lastName, email, username } = authUser;

    return (
        <div className='container'>


            <h2>Your Account</h2>


            <ul>
                <li><strong>First Name:</strong> {firstName}</li>
                <li><strong>Last Name: </strong>{lastName}</li>
                <li><strong>Username: </strong>{username}</li>
                <li><strong>Email:</strong> {email}</li>
        </ul>
       


        </div >
     )




}

export default Youraccount
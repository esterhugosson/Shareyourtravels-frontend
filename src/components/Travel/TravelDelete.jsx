import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { TravelService } from '../../services/travelService.js'
import { toast } from 'react-toastify'

export const TravelDelete = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const authHeader = useAuthHeader()

    if (!authHeader) {
        return <div className="container">You are not logged in.</div>;
    }

    const [error, setError] = useState(null)

    useEffect(() => {
    const deleteTravel = async () => {
        try {
            const response = await TravelService.delete(id, authHeader);

           
                toast.success('Travel deleted successfully.');
                setTimeout(() => navigate('/travels'), 1000)
            
        } catch (err) {
            // If 404, treat as already deleted and just navigate away
            if (err.response?.status === 404) {
                setTimeout(() => navigate('/travels'), 1000);
            } else {
                setError('Failed to delete travel.');
                toast.error('Failed to delete travel. Please try again later.');
                console.error(err);
            }
        }
    };

    deleteTravel();
}, [id, authHeader, navigate]);



    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return <p></p>


}

export default TravelDelete
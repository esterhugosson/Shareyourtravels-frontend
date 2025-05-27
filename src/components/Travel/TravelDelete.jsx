import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { TravelService } from '../../services/travelService.js'
import { toast } from 'react-toastify'

export const TravelDelete = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const [error, setError] = useState(null)

    useEffect(() => {
        const deleteTravel = async () => {
            try {
                const responseStatus = await TravelService.delete(id, authHeader);

                if (responseStatus === 204) {
                    toast.success('Travel deleted successfully.');
                    setTimeout(() => navigate('/travels'), 1000)
                } else {
                    setError('Unexpected response from server.');
                    toast.error('Unexpected response from server. Please try again later.');
                }
            } catch (err) {
                setError('Failed to delete travel.')
                toast.error('Failed to delete travel. Please try again later.')
                console.error(err)
            }
        };

        deleteTravel()
    }, [id, authHeader, navigate])


    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return <p></p>


}

export default TravelDelete
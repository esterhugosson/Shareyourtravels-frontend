import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { TravelService } from '../../services/travelService.js'

export const TravelDelete = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState('Deleting travel...')

    useEffect(() => {
        const deleteTravel = async () => {
            try {
                const response = await TravelService.delete(id, authHeader);

                if (response === '' || response === undefined) {
                    // Axios automatically parses empty 204 as empty string
                    setMessage('Travel deleted successfully.')
                    setTimeout(() => navigate('/travels')) // slight delay for UX
                } else {
                    setError('Unexpected response from server.')
                }
            } catch (err) {
                setError('Failed to delete travel.')
            }
        };

        deleteTravel();
    }, [id, authHeader, navigate])

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return <p>{message}</p>


}

export default TravelDelete
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { TravelService } from '../../services/travelService';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Travelform/Travelform.css'
import { formatDate } from '../../services/formatDate';

export const TravelEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const user = useAuthUser()
    const [travel, setTravel] = useState(null)

    useEffect(() => {
        const fetchTravel = async () => {
            try {
                const travel = await TravelService.getById(id, authHeader)
                setTravel(travel)


            } catch (err) {
                toast.error('Could not load travel. Try again later.')
            }
        }

        fetchTravel()
    }, [id])

    useEffect(() => {
        if (travel) {
            setDestination(travel.destination || '')
            setTransport(travel.transport || '')
            setNotes(travel.notes || '')
            setStartDate(travel.startDate || '')
            setEndDate(travel.endDate || '')
            setLocation(travel.location || { lat: '', lng: '' })
        }
    }, [travel])






    const [destination, setDestination] = useState('')
    const [transport, setTransport] = useState('')
    const [notes, setNotes] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [location, setLocation] = useState({ lat: '', lng: '' })

    if (!travel) return <div>Loading travel details...</div>;

    const { destination: currentDes, transport: currentTrans, notes: currentNotes, startDate: currentStart, endDate: currentEnd, location: { lat: currentLat, lng: currentLng } } = travel;

    const handleDestinationBlur = async () => {
        if (!destination.trim()) return;

        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: destination,
                    format: 'json',
                    limit: 1
                }
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setLocation({ lat, lng: lon });
                toast.success('Coordinates autofilled from destination!');
            } else {
                toast.error('Could not find coordinates for this destination. Please try to write a valid country/city.');
            }
        } catch (err) {
            toast.error('Geocoding failed.');
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedTravel = {}

        if (destination && destination !== currentDes) updatedTravel.destination = destination
        if (transport && transport !== currentTrans) updatedTravel.transport = transport
        if (notes && notes !== currentNotes) updatedTravel.notes = notes
        if (startDate && startDate !== currentStart) updatedTravel.startDate = startDate
        if (endDate && endDate !== currentEnd) updatedTravel.endDate = endDate

        if (
            (location.lat && location.lng) &&
            (location.lat !== currentLat || location.lng !== currentLng)
        ) {
            updatedTravel.location = location;
        }


        if (Object.keys(updatedTravel).length === 0) {
            toast.info('No changes to update')
            return
        }

        try {
            const response = await TravelService.update(id, updatedTravel, authHeader)


            toast.success('Travel updated successfully')
            setTimeout(() => navigate(`/travel/${id}`), 1000, window.location.reload())

        } catch (error) {
            console.error(error)
            toast.error('Failed to update travel')
        }
    }




    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onBlur={handleDestinationBlur}
                />
                <select
                    name="transport"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}

                >
                    <option value="">Select transport</option>
                    <option value="flight">Flight</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="train">Train</option>
                    <option value="other">Other</option>
                </select>

                <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                {/* New date inputs */}
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min="1950-01-01"
                    />
                </label>

                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min="1950-01-01"
                    />
                </label>

                {location.lat && location.lng && (
                    <p className="info-note">
                        📍 Coordinates: {location.lat}, {location.lng}
                    </p>
                )}


                <button type="submit">Update</button>
            </form>
        </div>
    )



}


export default TravelEdit

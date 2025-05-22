import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { TravelService } from '../../services/travelService'

export const TravelEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const authHeader = useAuthHeader()

    const apiUrl = import.meta.env.VITE_API_URL

    const [formData, setFormData] = useState({
        destination: '',
        transport: '',
        notes: '',
        startDate: '',
        endDate: '',
        location: { lat: '', lng: '' }
    });

    const [locationQuery, setLocationQuery] = useState('')
    const [geoError, setGeoError] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchTravel = async () => {
            try {
                const response = await axios.get(`${apiUrl}/travels/${id}`, {
                    headers: { Authorization: authHeader },
                });
                setFormData(response.data);
            } catch (err) {
                setError('Failed to load travel data.')
            }
        };

        fetchTravel()
    }, [id, authHeader])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    };

    const handleLocationQueryChange = (e) => {
        setLocationQuery(e.target.value)
    };

    const handleGeocode = async () => {
        if (!locationQuery.trim()) {
            setGeoError('Please enter a location to search.')
            return;
        }

        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: { q: locationQuery, format: 'json', limit: 1 },
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setFormData(prev => ({ ...prev, location: { lat, lng: lon } }));
                setGeoError('');
            } else {
                setGeoError('Location not found.');
            }
        } catch {
            setGeoError('Error fetching coordinates.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.destination || !formData.transport) {
            setError('Destination and transport type are required.');
            return;
        }

        try {
            await TravelService.update(id, formData, authHeader);
            navigate(`/travel/${id}`);
        } catch (err) {
            console.error(err);
            setError('Failed to update travel. Please try again.');
        }
    };

    return (
        <div className="travel-form-container">
            <h2>Edit Travel</h2>
            {error && <p className="error-text">{error}</p>}

            <form onSubmit={handleSubmit} className="travel-form">
                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                />

                <select
                    name="transport"
                    value={formData.transport}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select transport</option>
                    <option value="flight">Flight</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="train">Train</option>
                    <option value="other">Other</option>
                </select>

                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Search Location:
                    <input
                        type="text"
                        value={locationQuery}
                        onChange={handleLocationQueryChange}
                        placeholder="Enter city or country"
                    />
                    <button type="button" onClick={handleGeocode}>Get Coordinates</button>
                </label>
                {geoError && <p className="error-text">{geoError}</p>}

                {formData.location.lat && formData.location.lng && (
                    <p>Coordinates: Latitude: {formData.location.lat}, Longitude: {formData.location.lng}</p>
                )}

                <button type="submit">Update Travel</button>
            </form>
        </div>
    );
};

export default TravelEdit;

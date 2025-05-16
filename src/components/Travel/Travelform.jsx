import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export const Travelform = () => {
    const authHeader = useAuthHeader()
    const user = useAuthUser();
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        destination: '',
        transport: '',
        notes: '',
        startDate: '',
        endDate: '',
        location: { lat: '', lng: '' }
    });

    const [locationQuery, setLocationQuery] = useState('');
    const [geoError, setGeoError] = useState('');
    const [error, setError] = useState('');

    // Handle input change for regular fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle location search input change
    const handleLocationQueryChange = (e) => {
        setLocationQuery(e.target.value);
    };

    // Geocode using OpenStreetMap Nominatim API
    const handleGeocode = async () => {
        if (!locationQuery.trim()) {
            setGeoError('Please enter a location to search.');
            return;
        }

        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: locationQuery,
                    format: 'json',
                    limit: 1
                }
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setFormData(prev => ({
                    ...prev,
                    location: { lat, lng: lon }
                }));
                setGeoError('');
            } else {
                setGeoError('Location not found.');
                setFormData(prev => ({
                    ...prev,
                    location: { lat: '', lng: '' }
                }));
            }
        } catch (error) {
            setGeoError('Error fetching coordinates.');
            setFormData(prev => ({
                ...prev,
                location: { lat: '', lng: '' }
            }));
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
            const response = await axios.post(`${apiUrl}/travels`, {
                ...formData
            }, {
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Travel created:', response.data);
            navigate('/travels');
        } catch (err) {
            console.error(err);
            setError('Failed to save travel. Please try again.');
        }
    };

    if (!user) return <p>Please sign in to add your travel!</p>;

    return (
        <div className="travel-form-container">
            <h2>Add a New Travel</h2>
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
                    placeholder="Notes (optional)"
                    value={formData.notes}
                    onChange={handleChange}
                />

                {/* New date inputs */}
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

                {/* Location search */}
                <label>
                    Search Location (city or country):
                    <input
                        type="text"
                        value={locationQuery}
                        onChange={handleLocationQueryChange}
                        placeholder="Enter city or country"
                    />
                    <button type="button" onClick={handleGeocode}>Get Coordinates</button>
                </label>
                {geoError && <p className="error-text">{geoError}</p>}

                {/* Show lat/lng if available */}
                {formData.location.lat && formData.location.lng && (
                    <p>Coordinates: Latitude: {formData.location.lat}, Longitude: {formData.location.lng}</p>
                )}

                <p className="info-note">
                    After saving this travel, you’ll be able to add detailed <strong>places</strong> you visited along the way in the next step.
                </p>

                <button type="submit">Save Travel</button>
            </form>
        </div>
    );
};

export default Travelform;

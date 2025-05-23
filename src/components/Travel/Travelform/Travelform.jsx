import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { toast } from 'react-toastify'
import './Travelform.css'

export const Travelform = () => {
    const authHeader = useAuthHeader()
    const user = useAuthUser()
    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        destination: '',
        transport: '',
        notes: ' ',
        startDate: '',
        endDate: '',
        location: { lat: '', lng: '' },
        isPublic: false
    })


    // Handle input change for regular fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleDestinationBlur = async () => {
        if (!formData.destination.trim()) return;

        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: formData.destination,
                    format: 'json',
                    limit: 1
                }
            })

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0]
                setFormData(prev => ({
                    ...prev,
                    location: { lat, lng: lon }
                }));
                toast.success('Coordinates autofilled from destination!')
            } else {
                toast.error('Could not find coordinates for this destination. Please try to write a valid country/city.')
            }
        } catch (err) {
            toast.error('Geocoding failed.')
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.destination || !formData.transport) {

            toast.error('Destination and transport type are required.')
            return
        }

        const start = new Date(formData.startDate)
        const end = new Date(formData.endDate)
        const minAllowedDate = new Date('1950-01-01')

        if (start && end && end < start) {
            toast.error('End date cannot be before start date.')
            return
        }

        if (start < minAllowedDate || end < minAllowedDate) {
            toast.error('Dates must be after January 1, 1950.')
            return
        }

        try {
            await axios.post(`${apiUrl}/travels`, {
                ...formData
            }, {
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            })

            toast.success('Travel saved!')
            navigate('/travels')
        } catch (err) {
            toast.error('Failed to save travel. Please try again.')
        }
    };

    if (!user) return <p>Please sign in to add your travel!</p>

    return (
        <div className="travel-form-container">
            <h2>Add a New Travel</h2>

            <form onSubmit={handleSubmit} className="travel-form">
                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                    onBlur={handleDestinationBlur}
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
                        required
                        min="1950-01-01"
                    />
                </label>

                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        min="1950-01-01"
                    />
                </label>

                <label className="public-checkbox">
                    <input
                        type="checkbox"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                isPublic: e.target.checked,
                            }))
                        }
                    />
                    Make travel public
                </label>





                {formData.location.lat && formData.location.lng && (
                    <p className="info-note">
                        📍 Coordinates found: {formData.location.lat}, {formData.location.lng}
                    </p>
                )}

                <p className="info-note">
                    After saving this travel, you’ll be able to add detailed <strong>places</strong> you visited along the way in the next step.
                </p>

                <button type="submit">Save Travel</button>
            </form>
        </div>
    );
};

export default Travelform

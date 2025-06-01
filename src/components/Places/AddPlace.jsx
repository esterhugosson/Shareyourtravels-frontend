import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { toast } from 'react-toastify'

export const AddPlace = () => {

        const authHeader = useAuthHeader()
        const user = useAuthUser()
        const navigate = useNavigate()
        const { id } = useParams()

        const apiUrl = import.meta.env.VITE_API_URL

        const [formData, setFormData] = useState({
                name: '',
                description: '',
                dateVisited: '',
                location: { lat: '', lng: '' },
                locationText: '',
                funFacts: '',
                rating: ''
        })

        // Handle input change for regular fields
        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value }))
        }

        const handleDestinationBlur = async (locationText) => {
                if (!locationText) return;

                try {
                        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                                params: {
                                        q: formData.locationText,
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

                if (!formData.name) {
                        toast.error('Name and location are required.')
                        return
                }

                const date = new Date(formData.dateVisited)
                const minAllowedDate = new Date('1950-01-01')


                if (date < minAllowedDate) {
                        toast.error('Dates must be after January 1, 1950.')
                        return
                }

                try {
                        await axios.post(`${apiUrl}/travels/${id}/places`, {
                                ...formData
                        }, {
                                headers: {
                                        'Authorization': authHeader,
                                        'Content-Type': 'application/json'
                                }
                        })

                        toast.success('Place saved!')
                        setTimeout(() => {
                                navigate(`/travel/${id}`)
                                window.location.reload()
                        }, 2000)
                } catch (err) {
                        toast.error('Failed to save travel. Please try again.')
                }
        };

        if (!user) return <p>Please sign in to add place!</p>


        return (<div className="place-form-container">
                <h2>Add a New Place</h2>

                <form onSubmit={handleSubmit} className="travel-form">
                        <input
                                type="text"
                                name="name"
                                placeholder="Name of the place..."
                                value={formData.name}
                                onChange={handleChange}
                                required
                        />

                        <input
                                type="text"
                                name="description"
                                placeholder="Description of the place..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                        />

                        <label>
                                Date of visit:
                                <input
                                        type="date"
                                        name="dateVisited"
                                        value={formData.dateVisited}
                                        onChange={handleChange}
                                        required
                                        min="1950-01-01"
                                />
                        </label>

                        <input
                                type="text"
                                name="location"
                                placeholder="Location..."
                                value={formData.locationText || ''} // we need to store the text input separately
                                onChange={(e) => setFormData(prev => ({ ...prev, locationText: e.target.value }))}
                                onBlur={(e) => handleDestinationBlur(e.target.value)}
                                required
                        />

                        <input
                                type="text"
                                name="funFacts"
                                placeholder="Fun Facts of the place..."
                                value={formData.funFacts}
                                onChange={handleChange}
                        />

                        <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                        >
                                <option value="">Select rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                        </select>





                        {formData.location.lat && formData.location.lng && (
                                <p className="info-note">
                                        📍 Coordinates found: {formData.location.lat}, {formData.location.lng}
                                </p>
                        )}

                        <button type="submit">Save place</button>
                </form>
        </div>)


}

export default AddPlace
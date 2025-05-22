import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import axios from 'axios'
import { toast } from 'react-toastify'
import mapboxgl from 'mapbox-gl'
import './PlaceList.css'

export const PlaceList = () => {

        const { id } = useParams()
        const navigate = useNavigate()
        const authHeader = useAuthHeader()
        const [places, setPlaces] = useState(null)

        const apiUrl = import.meta.env.VITE_API_URL
        const mapboxToken = import.meta.env.VITE_APP_MAPBOX
        mapboxgl.accessToken = mapboxToken

        useEffect(() => {
                const fetchPlaces = async () => {
                        try {
                                const response = await axios.get(`${apiUrl}/travels/${id}/places`, {
                                        headers: {
                                                Authorization: authHeader,
                                        },
                                });
                                setPlaces(response.data);
                        } catch (err) {
                                toast.error('Could not load places.')
                        }
                }

                fetchPlaces()
        }, [id])




        useEffect(() => {
                // After places are loaded, initialize maps
                if (places && places.length > 0) {
                        places.forEach((place) => {
                                if (place.location?.lat && place.location?.lng) {
                                        const container = document.getElementById(`map-${place.id}`)
                                        if (container && !container.hasChildNodes()) {
                                                const map = new mapboxgl.Map({
                                                        container: container,
                                                        style: 'mapbox://styles/mapbox/streets-v11',
                                                        center: [place.location.lng, place.location.lat],
                                                        zoom: 10,
                                                })

                                                new mapboxgl.Marker()
                                                        .setLngLat([place.location.lng, place.location.lat])
                                                        .addTo(map)
                                        }
                                }
                        })
                }
        }, [places])

        if (!places) return <p>Loading places...</p>
        if (places.length === 0) return <p>No places added yet.</p>




        return (
                <div className="place-list">
                        <h3>🗺️ Places on this journey</h3>
                        <ul>
                                {places.map((place, index) => (
                                        <li className="place-card" key={place.id}>
                                                <h4> {place.name}</h4>
                                                <p><strong>Description:</strong> {place.description}</p>
                                                <p><strong>Rating:</strong> {place.rating}/5</p>
                                                {place.funFacts.length > 0 && (
                                                        <div>
                                                                <strong>Fun Facts:</strong>
                                                                <ul>
                                                                        {place.funFacts.map((fact, idx) => (
                                                                                <li key={idx}>🌟 {fact}</li>
                                                                        ))}
                                                                </ul>
                                                        </div>
                                                )}
                                                {place.location?.lat && place.location?.lng && (
                                                        <div
                                                                id={`map-${place.id}`}
                                                                className="place-map"
                                                        />
                                                )}
                                        </li>
                                ))}
                        </ul>
                </div>
        )


}

export default PlaceList
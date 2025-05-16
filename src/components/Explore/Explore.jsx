import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Link } from 'react-router-dom'
import './Explore.css'


export const Explore = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


   useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get(`${apiUrl}/travels/allTravels`)
        setTravels(response.data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // No travels found — treat it as an empty list, not a hard error
          setTravels([])
        } else {
          setError('Could not fetch travels. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTravels()
  }, [apiUrl])

  if (loading) return <p>Loading your travels...</p>
  if (error) return <p className="error-text">{error}</p>

  return (
    <div className="travels-container">
      <h2>Travels</h2>
      {travels.length === 0 ? (
        <div className="no-travels">
          <p>Nobody have added any travels yet.</p>
        </div>
      ) : (
        <ul className="travel-list">
          {travels.map((travel) => (
            <li key={travel.id}>
              <strong>{travel.destination}</strong> – {travel.notes || 'No notes'}
            </li>
          ))}
        </ul>
      )}
    </div>
  )


}

export default Explore
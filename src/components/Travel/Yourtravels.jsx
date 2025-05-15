import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Link } from 'react-router-dom'
import './Yourtravels.css'


export const Yourtravels = () => {
  const authHeader = useAuthHeader()
  const apiUrl = import.meta.env.VITE_API_URL

  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


   useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get(`${apiUrl}/travels`, {
          headers: {
            Authorization: authHeader
          }
        })
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
  }, [apiUrl, authHeader])

  if (loading) return <p>Loading your travels...</p>
  if (error) return <p className="error-text">{error}</p>

  return (
    <div className="travels-container">
      <h2>Your Travels</h2>
      {travels.length === 0 ? (
        <div className="no-travels">
          <p>You haven’t added any travels yet.</p>
          <div className="travel-actions">
            <Link to="/add">➕ Add a Travel</Link>
            <Link to="/explore">🌍 Explore Destinations</Link>
          </div>
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

export default Yourtravels
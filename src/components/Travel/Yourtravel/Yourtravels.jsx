import { useEffect, useState } from 'react'
import { TravelService } from '../../../services/travelService.js'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Yourtravels.css'

import TravelList from './TravelList'
import TravelMap from './TravelMap'

export const Yourtravels = () => {
  const authHeader = useAuthHeader()

  if (!authHeader) return <p>Please sign in to see your travels! <Link to="/signin">Sign in!</Link> </p>

  const [view, setView] = useState('list')
  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const data = await TravelService.getAll(authHeader)
        setTravels(data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setTravels([])
        } else {
          toast.error('Could not fetch travels. Please try again later.')
          setError('Could not fetch travels. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTravels()
  }, [authHeader])

  
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
        <>
          <div className="view-toggle">
            <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>
              📋 List
            </button>
            <button onClick={() => setView('map')} className={view === 'map' ? 'active' : ''}>
              🗺️ Map
            </button>
          </div>

          {view === 'list' ? (
            <TravelList travels={travels} />
          ) : (
            <TravelMap travels={travels} />
          )}
        </>
      )}
    </div>
  )
}

export default Yourtravels

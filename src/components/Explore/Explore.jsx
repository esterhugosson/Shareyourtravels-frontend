import { useEffect, useState } from 'react'
import { TravelService } from '../../services/travelService.js'
import './Explore.css'
import ExploreList from './ExploreList.jsx'
import ExploreMap from './ExploreMap.jsx'
import { toast } from 'react-toastify'

export const Explore = () => {

  const [travels, setTravels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState(null)



  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const data = await TravelService.getAllPublic()

        setTravels(data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setTravels([])
        } else {
          setError('Could not fetch travels. Please try again later.')
          toast.error('Could not fetch travels. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTravels()
  }, [])

  if (loading) return <p>Loading travels...</p>
  if (error) return <p className="error-text">{error}</p>

  return (
    <div className="explore-travels-container">
      <h2>Explore Travels</h2>
      {travels.length === 0 ? (
        <div className="no-travels">
          <p>Nobody have added any travels yet.</p>
        </div>
      ) : (
        <div className="explore-layout">
          <div className="explore-map-container">
            <ExploreMap travels={travels} onMarkerClick={setExpandedId} />
          </div>
          <div className="list-container">
            <ExploreList travels={travels}
              expandedId={expandedId}
              setExpandedId={setExpandedId} />
          </div>
        </div>
      )}
    </div>

  )


}

export default Explore
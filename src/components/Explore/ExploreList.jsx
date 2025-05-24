import { useState } from 'react'
import { formatDate } from '../../services/formatDate'
import PlaceService from '../../services/placeService'
import { toast } from 'react-toastify'

const ExploreList = ({ travels, expandedId, setExpandedId }) => {
  const [placesByTravel, setPlacesByTravel] = useState({})
  const [loadingPlaces, setLoadingPlaces] = useState(false)

  const toggleDetails = async (id) => {
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)

      if (!placesByTravel[id]) {
        try {
          setLoadingPlaces(true)
          const places = await PlaceService.getAllPublicPlaces(id)
          setPlacesByTravel(prev => ({ ...prev, [id]: places }))
        } catch (err) {
          toast.error('Could not load places for this travel. Try again later')
        } finally {
          setLoadingPlaces(false)
        }
      }
    }
  }

  return (
    <ul className="travel-list-explore">
      {travels.map(travel => (
        <li key={travel.id}>
          <h3 onClick={() => toggleDetails(travel.id)} className="explore-travel-title">
            {travel.destination}
          </h3>

          {expandedId === travel.id && (
            <div>
              <p><strong>Transport:</strong> {travel.transport}</p>
              <p><strong>Notes:</strong> {travel.notes}</p>
              <p><strong>Dates:</strong> {formatDate(travel.startDate)} – {formatDate(travel.endDate)}</p>

              {loadingPlaces ? (
                <p>Loading places...</p>
              ) : (
                <>
                  <h4>Places:</h4>
                  {placesByTravel[travel.id]?.length > 0 ? (
                    <ul className="explore-place-list">
                      {placesByTravel[travel.id].map(place => (
                        <li key={place.id}>
                          <p><strong>{place.name}</strong>: {place.description}</p>
                          <p><strong>Fun facts:</strong> {place.funFacts}</p>
                          <p><strong>Location:</strong> {place.location.lat}, {place.location.lng}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No public places added to this travel.</p>
                  )}
                </>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ExploreList


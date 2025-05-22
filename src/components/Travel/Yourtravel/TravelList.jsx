import { Link } from 'react-router-dom'
import './TravelList.css'

const TravelList = ({ travels }) => {

// Helper to format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString()
  }


  return (
    <ul className="travel-list-personal">
      {travels.map(travel => (
        <li key={travel.id}>
          <Link to={`/travel/${travel.id}`} className="travel-card-personal">
            <h3>{travel.destination}</h3>
            <p><strong>Transport:</strong> {travel.transport}</p>
            <p><strong>Dates:</strong> {formatDate(travel.startDate)} – {formatDate(travel.endDate)}</p>
            {travel.notes && <p>{travel.notes}</p>}
          </Link>
        </li>
      ))}
      <li>
        <Link to="/add" className="travel-card-personal add-card">
          <h3>➕ Add a Travel</h3>
        </Link>
      </li>
    </ul>
  )
}

export default TravelList
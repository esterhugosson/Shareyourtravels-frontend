import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import axios from 'axios';
import './Yourtravels.css'
import { Outlet } from 'react-router-dom'

export const TravelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const [travel, setTravel] = useState(null);
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await axios.get(`${apiUrl}/travels/${id}`, {
          headers: {
            Authorization: authHeader,
          },
        });
        setTravel(response.data);
      } catch (err) {
        setError('Could not load travel.')
      }
    }

    fetchTravel()
  }, [id]);

  // Helper to format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString()
  };

  // Helper to calculate duration in days
  const getDurationDays = (start, end) => {
    if (!start || !end) return '-'
    const startDate = new Date(start)
    const endDate = new Date(end)
    // Calculate difference in milliseconds, then convert to days (rounded)
    const diffTime = endDate - startDate
    if (diffTime < 0) return '-' // End before start? Invalid
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + ' day(s)'
  };

  if (error) return <p>{error}</p>
  if (!travel) return <p>Loading...</p>

  return (
    <div className="travel-detail">
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/travels')}>⬅️ Back</button>
        <button onClick={() => navigate('edit')}>✏️ Edit</button>
        <button onClick={() => navigate('delete')}>❌ Delete</button>
        
      </div>

      <h2>{travel.destination}</h2>
      <p><strong>Transport:</strong> {travel.transport}</p>

      {/* Duration display */}
      <p>
        <strong>Duration:</strong>{' '}
        {getDurationDays(travel.startDate, travel.endDate)}
        {' '}({formatDate(travel.startDate)} - {formatDate(travel.endDate)})
      </p>

      {/* Location display */}
      {travel.location && travel.location.lat && travel.location.lng ? (
        <p>
          <strong>Location:</strong> Latitude: {travel.location.lat}, Longitude: {travel.location.lng}
        </p>
      ) : (
        <p><strong>Location:</strong> Not specified</p>
      )}

      <p><strong>Notes:</strong> {travel.notes}</p>

      <h3>Places Visited</h3>
      {travel.places && travel.places.length > 0 ? (
        <ul>
          {travel.places.map(place => (
            <li key={place._id}>{place.name}</li>
          ))}
        </ul>
      ) : (
        <p>No places added yet.</p>
      )}

      <button onClick={() => { navigate('/add-place') }}>
        ➕ Add Place
      </button>

      <Outlet />
    </div>
    
  );
};

export default TravelDetail;

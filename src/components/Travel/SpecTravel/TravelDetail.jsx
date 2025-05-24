import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import axios from 'axios';
import './TravelDetail.css'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'


import { TravelLocation } from './Location/TravelLocation'
import { PlaceList } from './PlaceList/PlaceList'

export const TravelDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const authHeader = useAuthHeader()
  const [travel, setTravel] = useState(null)
  const [error, setError] = useState('')
  const [showPlaces, setShowPlaces] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL
  let status = 'Private'

  // Defensive check in case authUser is null (e.g., before login or on logout)
    if (!authHeader) {
        return <div className="container">You are not logged in.</div>;
    }

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await axios.get(`${apiUrl}/travels/${id}`, {
          headers: {
            Authorization: authHeader,
          },
        })
        setTravel(response.data)
      } catch (err) {
        setError('Could not load travel.')
        toast.error('Could not load travel.')
      }
    }

    fetchTravel()
  }, [id])

  // Helper to format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString()
  }

  // Helper to calculate duration in days
  const getDurationDays = (start, end) => {
    if (!start || !end) return '-'
    const startDate = new Date(start)
    const endDate = new Date(end)
    // Calculate difference in milliseconds, then convert to days (rounded)
    const diffTime = endDate - startDate
    if (diffTime < 0) return '-' // End before start? Invalid
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + ' day(s)'
  }

  if (error) return <p>{error}</p>
  if (!travel) return <p>Loading...</p>

  if(travel.isPublic) {
    status = 'Public'
  }

  return (
    <div className="travel-detail">
      <div className="top-bar">
        <button className="back-button" onClick={() => navigate('/travels')}>⬅ Back</button>
        <div className="button-group">
          <button onClick={() => navigate('edit')}> Edit</button>
          <button onClick={() => navigate('delete')}> Delete</button>
        </div>
      </div>

      <div className="header-section">
        <h2>{travel.destination}</h2>
      </div>

      <div className="content-grid">
        {/* Left: Map */}
        {travel.location?.lat && travel.location?.lng ? (
          <div className="location-container">
            <TravelLocation lat={travel.location.lat} lng={travel.location.lng} />
          </div>
        ) : (
          <p><strong>Location:</strong> Not specified</p>
        )}

        

        {/* Right: Travel details */}
        <div className="details-box">
          <h3>Your Travel Summary</h3>
          <ul>
            <li><strong>Transport:</strong> {travel.transport}</li>
            <li><strong>Notes:</strong> {travel.notes}</li>
            <li>
              <strong>Duration:</strong> {getDurationDays(travel.startDate, travel.endDate)}

            </li>
            <li><strong>Start date:</strong> {formatDate(travel.startDate)} </li>
            <li><strong>End date:</strong> {formatDate(travel.endDate)} </li>
            <li><strong>Stops:</strong> {(travel.places.length)} </li>
            <li><strong>Status</strong> {(status)} </li>
          </ul>
        </div>
      </div>

      {/* Summary text before places */}
      <p className="summary-text">
        Your travel to <strong>{travel.destination}</strong> that started on <strong>{formatDate(travel.startDate)}</strong> was done by <strong>{travel.transport}</strong>. {travel.notes && <>Notes: {travel.notes}</>}
      </p>

      {/* Place list */}
      <div className="place-section">
        <div
          className="toggle-header"
          onClick={() => setShowPlaces(prev => !prev)}
        >
          <span className={`arrow ${showPlaces ? 'open' : ''}`}>▸</span>
          <h3>Show Places</h3>
        </div>

        <div className={`place-content ${showPlaces ? 'visible' : 'hidden'}`}>
          {travel.places && travel.places.length > 0 ? (
            <PlaceList />
          ) : (
            <p>No places added yet.</p>
          )}

          <div className="add-place-button">
        <button onClick={() => { navigate('add-place') }}>➕ Add Place</button>
      </div>
        </div>

        
      </div>

      

      <Outlet />
    </div>
  )

}

export default TravelDetail;

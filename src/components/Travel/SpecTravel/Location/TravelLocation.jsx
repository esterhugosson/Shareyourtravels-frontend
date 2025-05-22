import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './TravelLocation.css'

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX


export const TravelLocation = ({ lat, lng }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (!lat || !lng) return

    // Initialize map only once
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: 1,
    })

    // Add marker
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, [lat, lng])

  return (
    <div className="map-container" ref={mapContainer} />
  )
}

export default TravelLocation
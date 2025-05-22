import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
import './Yourtravels.css'

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX

export const TravelMap = ({ travels }) => {

  const navigate = useNavigate()
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])  

  // Initialize map once
  useEffect(() => {
    if (mapRef.current) return // already initialized

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.5,
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !mapRef.current.loaded()) return

    // Remove old markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add new markers
    travels.forEach(travel => {
      if (travel.location?.lng && travel.location?.lat) {
        const marker = new mapboxgl.Marker()
          .setLngLat([travel.location.lng, travel.location.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(travel.destination))
          .addTo(mapRef.current)
        markersRef.current.push(marker)
      }
    })

  }, [travels])

  // If map is not loaded yet, wait for 'load' event to add markers
  useEffect(() => {
    if (!mapRef.current) return

    function onLoad() {
      if (!mapRef.current) return

      // Remove old markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []

      travels.forEach(travel => {
        if (travel.location?.lng && travel.location?.lat) {
        // Create a custom HTML element for the marker
        const el = document.createElement('div')
        el.className = 'custom-marker'  // style this class with CSS as you want
        el.style.cursor = 'pointer'

        el.addEventListener('click', () => {
          navigate(`/travel/${travel.id}`)
        })

        const marker = new mapboxgl.Marker(el)
          .setLngLat([travel.location.lng, travel.location.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(travel.destination))
          .addTo(mapRef.current)

        markersRef.current.push(marker)
      }
      })
    }

    if (!mapRef.current.loaded()) {
      mapRef.current.once('load', onLoad)
    } else {
      onLoad()
    }

    return () => {
      mapRef.current?.off('load', onLoad)
    }
  }, [travels])

  return <div ref={mapContainerRef} className="travel-map-container" />
}

export default TravelMap

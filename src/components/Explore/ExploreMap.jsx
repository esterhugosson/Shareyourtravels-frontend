import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX

export const ExploreMap = ({ travels, onMarkerClick }) => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (mapRef.current) return

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
  if (!mapRef.current) return

  const map = mapRef.current

  const handleLoad = () => {
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    travels.forEach(travel => {
      if (travel.location?.lng && travel.location?.lat) {
        const marker = new mapboxgl.Marker()
          .setLngLat([travel.location.lng, travel.location.lat])
          .addTo(map)

        marker.getElement().addEventListener('click', () => {
          onMarkerClick?.(travel.id)
        })

        markersRef.current.push(marker)
      }
    })
  }

  if (map.loaded()) {
    handleLoad()
  } else {
    map.on('load', handleLoad)
  }

  return () => {
    map.off('load', handleLoad)
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []
  }
}, [travels, onMarkerClick])


  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
}

export default ExploreMap

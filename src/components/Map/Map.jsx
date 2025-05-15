import { useRef, useEffect } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11', // REQUIRED
      center: [0, 0], // Optional: set initial map center
      zoom: 2,        // Optional: set initial zoom level
    })

    return () => {
      mapRef.current?.remove(); // Safely remove map if it exists
    };
  }, [])

  return <div id="map-container" ref={mapContainerRef} />
}

export default Map

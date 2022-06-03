import React, { useRef, useEffect, useState } from 'react';
import { ReactDOM } from 'react';
import mapboxgl from 'mapbox-gl';
import DriverHeader from '../components/DriverHeader';
import { Marker } from "react-map-gl";
import { GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Screen from './Screen'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useSelector, useDispatch } from 'react-redux'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { Button } from 'react-bootstrap'
import { DriverScreen } from './DriverScreen';

import { show_direction  } from '../actions/locationActions'
import { center } from '@turf/turf';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};


const DriverHomeScreen = () => {

  const [current,setCurrent] = useState([])

  const location1 = useSelector(state => state.pickUp)
  let { startCordinate } = location1;

  const location2 = useSelector(state => state.destination)  
  let { endCordinate } = location2;

  const geometry = useSelector(state => state.direction)
  const { directionInfo } = geometry


  const dispatch = useDispatch()

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("currentLocation:",position.coords.latitude, position.coords.longitude)
      setCurrent([position.coords.longitude,position.coords.latitude])
    })
  }


  useEffect(() => {

    if(!startCordinate && !endCordinate) return; 

    dispatch(show_direction(startCordinate, endCordinate))

  }, [startCordinate, endCordinate ])

  useEffect(() => {

    getCurrentPosition()

  },[])


  const mapContainerRef = useRef(null)

  useEffect(() => {

   
    // if (!cordinates && !destinationCord) return
    const map = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76.2673041,9.9312328],
      zoom: 10,

    }).addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,

      },
      trackUserLocation: false,
      showUserHeading: true,
      showUserLocation: true,
      showAccuracyCircle: true

    }))

  

    if(startCordinate) {
      
      const marker1 = new mapboxgl.Marker({
        draggable: false
      }).setLngLat(startCordinate)
        .addTo(map)
    }

    if(endCordinate) {

      const marker2 = new mapboxgl.Marker({
        draggable: false
      }).setLngLat(endCordinate)
        .addTo(map)
    }


    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl({
      showCompass: true
    }));


    map.on('load', () => {
      console.log("loading")
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': directionInfo,
          }
        }
      });
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
    });


    
    
    // clean up on unmount
    return () => {
      
      map.remove();

    }
  }, [directionInfo,startCordinate,endCordinate]); // eslint-disable-line react-hooks/exhaustive-deps 
  
  
  
  
  
  return (
    
    <div style={{ width: '100%', height: '90vh', position: 'relative', backgroundColor: 'white' }}>
     
      <DriverHeader/>

      <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100%', position: 'absolute' }}>

      </div>

     <DriverScreen/>

    </div>

  )


};

export default DriverHomeScreen
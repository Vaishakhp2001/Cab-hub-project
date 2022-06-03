import React, { useRef, useEffect, useState } from 'react';
import { ReactDOM } from 'react';
import mapboxgl from 'mapbox-gl';
import Header from '../components/Header'
import { Marker } from "react-map-gl";
import { GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {Screen} from './Screen'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useSelector, useDispatch } from 'react-redux'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { Button } from 'react-bootstrap'
import * as turf from '@turf/turf'

import { show_direction } from '../actions/locationActions'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const HomeScreen = () => {

  const [center, setCenter] = useState([])

  const location1 = useSelector(state => state.pickUp)
  let { startCordinate } = location1;

  const location2 = useSelector(state => state.destination)
  let { endCordinate } = location2;

  const geometry = useSelector(state => state.direction)
  const { directionInfo } = geometry

  const driver = useSelector(state => state.driverReached)

  const { reached } = driver

  const { reachedDestination } = useSelector(state => state.reachedDestination)

  const dispatch = useDispatch()

  useEffect(() => {

    getCurrentPosition()

  }, [])

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("currentLocation:", position.coords.latitude, position.coords.longitude)
      setCenter([position.coords.latitude, position.coords.longitude])
    })
  }


  useEffect(() => {
    if (!startCordinate && !endCordinate) {

      return;

    }

    console.log("start cor:", startCordinate, "end cord", endCordinate)

    dispatch(show_direction(startCordinate, endCordinate))

  }, [startCordinate, endCordinate])

  const mapContainerRef = useRef(null)

  useEffect(() => {

    if (!startCordinate) {
      
        startCordinate = [76.2673041,9.9312328]
      
    }

    // if (!cordinates && !destinationCord) return
    const map = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: startCordinate,
      zoom: 10,
      // pitch: 65,


    }).addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,

      },
      trackUserLocation: false,
      showUserHeading: true,
      showUserLocation: true,
      showAccuracyCircle: true

    }))

    if (reached) {

      const route = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': directionInfo
            }
          }
        ],

      };

      const point = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'Point',
              'coordinates': startCordinate
            }
          }
        ]
      };

      // Calculate the distance in kilometers between route start/end point.
      const lineDistance = turf.length(route.features[0]);

      let start;

      const arc = [];

      const steps = 30000;

      // Draw an arc between the `origin` & `destination` of the two points
      for (let i = 0; i < lineDistance; i += lineDistance / steps) {
        const segment = turf.along(route.features[0], i);
        arc.push(segment.geometry.coordinates);

      }

      route.features[0].geometry.coordinates = arc;

      // Used to increment the value of the point measurement against the route.
      let counter = 0;


      map.on('load', () => {
        // Add a source and layer displaying a point which will be animated in a circle.
        map.addSource('route', {
          'type': 'geojson',
          'data': route
        });

        map.addSource('point', {
          'type': 'geojson',
          'data': point
        });

        map.addLayer({
          'id': 'route',
          'source': 'route',
          'type': 'line',
          'paint': {
            'line-width': 8,
            'line-color': '#007cbf'
          }
        });

        map.addLayer({
          'id': 'point',
          'source': 'point',
          'type': 'symbol',
          'layout': {
            // This icon is a part of the Mapbox Streets style.
            // To view all images available in a Mapbox style, open
            // the style in Mapbox Studio and click the "Images" tab.
            // To add a new image to the style at runtime see
            // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
            'icon-image': 'car-15',
            // 'icon-rotate': ['get', 'bearing'],
            'icon-rotation-alignment': 'map',
            'icon-allow-overlap': true,
            'icon-ignore-placement': true
          }
        });

        function animate() {
          const start =
            route.features[0].geometry.coordinates[
            counter >= steps ? counter - 1 : counter
            ];
          const end =
            route.features[0].geometry.coordinates[
            counter >= steps ? counter : counter + 1
            ];
          if (!start || !end) return;

          // Update point geometry to a new position based on counter denoting
          // the index to access the arc
          point.features[0].geometry.coordinates =
            route.features[0].geometry.coordinates[counter];

          //camera animation

          const animationDuration = 80000;
          const cameraAltitude = 4000;

          const camera = map.getFreeCameraOptions();

          //  set the position and altitude of the camera
          camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
            {
              lng: start[0],
              lat: start[1]
            },
            cameraAltitude
          );

          // tell the camera to look at a point along the route
          camera.lookAtPoint({
            lng: start[0],
            lat: start[1]
          });

          map.setFreeCameraOptions(camera);

          // Calculate the bearing to ensure the icon is rotated to match the route arc
          // The bearing is calculated between the current point and the next point, except
          // at the end of the arc, which uses the previous point and the current point
          point.features[0].properties.bearing = turf.bearing(
            turf.point(start),
            turf.point(end)
          );

          // Update the source with this new data
          map.getSource('point').setData(point);

          // Request the next frame of animation as long as the end has not been reached
          if (counter < steps) {
            requestAnimationFrame(animate);
          }

          counter = counter + 1;

        }

        if(reachedDestination) {

          // document.getElementById('replay').addEventListener('click', () => {
          //   // Set the coordinates of the original point back to origin
            point.features[0].geometry.coordinates = origin;
  
          //   // Update the source layer
            map.getSource('point').setData(point);
  
          //   // Reset the counter
            counter = steps;
  
          //   // Restart the animation
            animate(counter);
          // });
  
          // Start the animation

        }

        animate(counter);
      });

    }

    if (startCordinate) {

      const marker1 = new mapboxgl.Marker({
        draggable: false
      }).setLngLat(startCordinate)
        .addTo(map)
    }

    if (endCordinate) {

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
          'line-color': '#007cbf',
          'line-width': 8
        }
      });

    });


    <div>

    
    </div>

    // clean up on unmount
    return () => {

      map.remove();

    }

  }, [directionInfo, reached, startCordinate, endCordinate, reachedDestination]); // eslint-disable-line react-hooks/exhaustive-deps 





  return (
    <>
    {/* <Header /> */}

    {/* <div style={{ width: '100%', height: '90vh', position: 'relative', backgroundColor: 'white' }}> */}

      <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100%', position: 'absolute' }}>

      </div>

    {/* <Screen /> */}


    {/* </div> */}

    </>

  )


};

export default HomeScreen
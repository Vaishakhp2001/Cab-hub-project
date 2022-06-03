import {
    PICKUP_LOCATION_SEARCH,
    PICKUP_LOCATION_RESULT,
    DESTINATION_LOCATION_SEARCH,
    DESTINATION_LOCATION_RESULT,
    PICKUP_LOCATION_SELECT,
    DESTINATION_LOCATION_SELECT,
    DIRECTION_REQUEST,
    DIRECTION_RESULT,
    CURRENT_LOCATION_RESULT,
    CURRENT_LOCATION_REQUEST,
    TOTAL_DISTANCE,
    TOTAL_DURATION
    
} from '../constants/locationConstants';
import axios from 'axios';
import { axiosInstance } from '../config';

export const search_pickup = ( location ) => async (dispatch) => {
    try {
        dispatch({
            type: PICKUP_LOCATION_SEARCH,
        })

        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
        const token = process.env.REACT_APP_MAPBOX_TOKEN;
        
        const { data } = await axios.get( url + location + '.json?access_token='+ token)    
        console.log(data)

       
        dispatch({
            type: PICKUP_LOCATION_RESULT,
            payload: data
        })
    }

    catch (err) {
        // console.log("error:",err)
    }
}

export const select_pickup = ( cordinates ) => async (dispatch) => {

    try {
        dispatch({
            type: PICKUP_LOCATION_SELECT,
            payload: cordinates
        })
    }
    catch (err) {
        // console.log("error:",err)
    }
}

export const search_destination = ( location ) => async (dispatch) => {
    try {
        dispatch({
            type: DESTINATION_LOCATION_SEARCH,
        })

        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
        const token = process.env.REACT_APP_MAPBOX_TOKEN;
        
        const { data } = await axios.get( url + location + '.json?access_token='+ token)
        

        dispatch({
            type: DESTINATION_LOCATION_RESULT,
            payload: data
        })
    }

    catch (err) {
        console.log("error:",err)
    }
}

export const select_destination = ( cordinates ) => async (dispatch) => {
    try {
        dispatch({
            type: DESTINATION_LOCATION_SELECT,
            payload: cordinates
        })
    }
    catch (err) {
        // console.log("error:",err)
    }
}

export const show_direction = ( latitude,longitude ) => async (dispatch) => {
    console.log('latitude',latitude,'longitude',longitude)
    try {
        dispatch({
            type: DIRECTION_REQUEST, 
            
        })

        const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/'
        const token = process.env.REACT_APP_MAPBOX_TOKEN

        if( typeof(latitude) !=='undefined' && typeof(longitude) !=='undefined' ) {

            const { data } = await axios.get( url + latitude[0] + "," + latitude[1] + ';' + 
            longitude[0] + ',' + longitude[1] + '?steps=true&geometries=geojson&'  + 'access_token=' + token )
            
            console.log("data of directons : ",data.routes[0].geometry.coordinates)

            axiosInstance.post
            ('/api/users/trip_details',
            {direction : data.routes[0].geometry.coordinates, distance: data.routes[0].distance, start:latitude, end: longitude})

            dispatch({
                type: DIRECTION_RESULT,
                payload: data.routes[0].geometry.coordinates,
            })

            // dispatch({
            //     type: TOTAL_DISTANCE,
            //     payload: data.routes[0].distance
            // })

            // dispatch({
            //     type: TOTAL_DURATION,
            //     payload: data.routes[0].duration
            // })
    
        }
        else {
            // console.log('no result')
        }



    } catch(err) {
        console.log("error:",err)
    }
}


// export const show_vehicles = ( latitude,longitude ) => async (dispatch) => {
//     console.log('latitude',latitude,'longitude',longitude)
//     try {
//         dispatch({
//             type: DISTANCE_CALCULATION_REQUEST, 
            
//         })

//         if( typeof(latitude) !=='undefined' && typeof(longitude) !=='undefined' ) {   

//             var distance = turf.distance(latitude, longitude);
            
//             console.log("data of directons vehicles: ",distance)
    
//             dispatch({
//                 type: DISTANCE_CALCULATION_RESULT,
//                 payload: distance,
//             })
//         }
//         else {
//             // console.log('no result')
//         }



//     } catch(err) {
//         console.log("error:",err)
//     }
// }

export const current_location = (latitude,longitude) => async(dispatch) => {
    try {
        dispatch({
            type: CURRENT_LOCATION_REQUEST
        })

        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        const token = process.env.REACT_APP_MAPBOX_TOKEN

        const { data } = await axios.get( url + longitude + "," + latitude + '.json?types=poi&access_token=' + token)
        console.log(data.features[0].place_name)

        dispatch({
            type: CURRENT_LOCATION_RESULT,
            payload: data.features[0].place_name
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const show_distance = ( latitude,longitude ) => async (dispatch) => {
    
    try {
       
        const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/'
        const token = process.env.REACT_APP_MAPBOX_TOKEN

        if( typeof(latitude) !=='undefined' && typeof(longitude) !=='undefined' ) {

            const { data } = await axios.get( url + latitude[0] + "," + latitude[1] + ';' + longitude[0] + 
            ',' + longitude[1] + '?steps=true&geometries=geojson&'  + 'access_token=' + token )
            
            console.log("data of directons : ",data.routes[0].distance)

            

            dispatch({
                type: TOTAL_DISTANCE,
                payload: data.routes[0].distance
            })

            // dispatch({
            //     type: TOTAL_DURATION,
            //     payload: data.routes[0].duration
            // })
    
        }
        else {
            // console.log('no result')
        }



    } catch(err) {
        console.log("error:",err)
    }
}

export const show_duration = ( latitude,longitude ) => async (dispatch) => {
    
    try {
       
        const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/'
        const token = process.env.REACT_APP_MAPBOX_TOKEN

        if( typeof(latitude) !=='undefined' && typeof(longitude) !=='undefined' ) {

            const { data } = await axios.get( url + latitude[0] + "," + latitude[1] + ';' + longitude[0] + ',' + longitude[1] + '?steps=true&geometries=geojson&'  + 'access_token=' + token )
           
            dispatch({
                type: TOTAL_DURATION,
                payload: data.routes[0].duration
            })
    
        }
        else {
            // console.log('no result')
        }



    } catch(err) {
        console.log("error:",err)
    }
}





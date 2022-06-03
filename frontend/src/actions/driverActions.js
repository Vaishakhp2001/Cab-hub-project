import { axiosInstance } from '../config'
import {
    DRIVER_LOGIN_REQUEST,
    DRIVER_LOGIN_SUCCESS,
    DRIVER_LOGIN_FAIL,
    DRIVER_REGISTER_REQUEST,
    DRIVER_REGISTER_SUCCESS,
    DRIVER_REGISTER_FAIL,
    DRIVER_LOGOUT,
    DRIVER_INFO,
    DRIVER_LOCATION_REQUEST,
    DRIVER_LOCATION
} from "../constants/driverConstants";

export const getDriver = () => async (dispatch) => {

    dispatch({
        type: DRIVER_INFO
    })

}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: DRIVER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axiosInstance.post(
            '/api/driver/login',
            { email, password },
            config
        )

        console.log("data ************", data)


        dispatch({
            type: DRIVER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('driverInfo', JSON.stringify(data))

    }
    catch (err) {
        console.log("error ***", err)
        dispatch({
            type: DRIVER_LOGIN_FAIL,
            payload: ''

        })
    }
}

export const register = (name, email, phone, password) => async (dispatch) => {
    try {
        dispatch({
            type: DRIVER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axiosInstance.post(
            '/api/driver',
            { name, email, phone, password },
            config
        )

        console.log("data ************", data)



        dispatch({
            type: DRIVER_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('driverInfo', JSON.stringify(data))

    }
    catch (error) {

        dispatch({
            type: DRIVER_REGISTER_FAIL,
            payload: error.response.status == 401 ? "Driver with this email already exist" : "Invalid credentials"

        })
    }
}

export const logout = () => async (dispatch) => {

    let driverInfo = localStorage.getItem('driverInfo')

    driverInfo = JSON.parse(driverInfo)

    const driverId = driverInfo._id

    localStorage.removeItem('driverInfo')

    const { data } = await axiosInstance.put(
        '/api/driver/logout',
        { driverId }
    )

    dispatch({ type: DRIVER_LOGOUT })


}

export const driverCurrentLocation = (id,longitude, latitude) => async (dispatch) => {

    try{

        dispatch({
            type: DRIVER_LOCATION_REQUEST
        })

        console.log("location call")
    
        const { data } = await axiosInstance.patch
            ('/api/driver/current_location',
                { id,longitude, latitude })
    
        dispatch({
            type: DRIVER_LOCATION,
            payload: data
        })

    }

    catch(error) {

        console.log(error)

    }


}




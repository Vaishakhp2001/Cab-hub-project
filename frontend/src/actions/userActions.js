import {
    USER_INFO,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_RESPONSE,
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGOUT,

} from "../constants/userConstants";
import { axiosInstance } from '../config'

export const getUser = () => async(dispatch) => {

    dispatch({
        type:USER_INFO
    })

}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axiosInstance.post(
            '/api/users/login',
            { email, password },
            config
        )

        console.log("user id : ", data._id)


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch (err) {
        console.log(err)
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err ? "Invalid email or password" : ""

        })
    }
}

export const register = (name, email, phone, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axiosInstance.post(
            '/api/users',
            { name, email, phone, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.status == 401 ? "User already exist" : "Invalid User data"

        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: GOOGLE_LOGOUT})
}

export const google_login = (tokenId) => async (dispatch) => {

    try {

        dispatch({
            type: GOOGLE_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axiosInstance.post(
            '/api/users/googlelogin',
            { tokenId: tokenId },
            config
        )

        dispatch({
            type: GOOGLE_LOGIN_RESPONSE,
            payload: data
        })

    }
    catch (err) {

       dispatch({
           type: GOOGLE_LOGIN_FAIL,
           payload: err.response.data
       })
    }

    
}
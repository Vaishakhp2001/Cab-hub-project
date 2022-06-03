import { axiosInstance } from '../config'
import {
    DRIVER_LOGIN_REQUEST,
    DRIVER_LOGIN_SUCCESS,
    DRIVER_LOGIN_FAIL,
    DRIVER_REGISTER_REQUEST,
    DRIVER_REGISTER_SUCCESS,
    DRIVER_REGISTER_FAIL,
    DRIVER_LOGOUT,
    DRIVER_INFO
} from "../constants/driverConstants";

const initialState = {
    driver : localStorage.getItem('driverInfo')
}

export const driverInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case DRIVER_INFO:
            return { driverInfo: initialState }
        default:
            return state
    }
}

export const driverLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case DRIVER_LOGIN_REQUEST:
            return { loading1 : true}
        case DRIVER_LOGIN_SUCCESS:
            return { loading1 : false, driverInfo : action.payload}
        case DRIVER_LOGIN_FAIL:
            return { loading1 : false, error1: action.payload}
        case DRIVER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const driverRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case DRIVER_REGISTER_REQUEST:
            return { loading : true}
        case DRIVER_REGISTER_SUCCESS:
            return { loading : false, driverInfo : action.payload}
        case DRIVER_REGISTER_FAIL:
            return { loading : false, error : action.payload}
        
        default:
            return state
    }
}
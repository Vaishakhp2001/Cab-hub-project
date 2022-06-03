import {
    USER_INFO,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_RESPONSE,
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGOUT

} from "../constants/userConstants";

const initialState = {
    user: localStorage.getItem('userInfo')
}

export const userInfoReducer = (state = initialState, action) => {

    switch (action.type) {
        case USER_INFO:
            return { userInfo: initialState }
        default:
            return state
    }
    
}

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading1: true }
        case USER_REGISTER_SUCCESS:
            return { loading1: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading1: false, error1: action.payload }

        default:
            return state
    }
}

export const googleLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case GOOGLE_LOGIN_REQUEST:
            return { loading: true }
        case GOOGLE_LOGIN_RESPONSE:
            return { loading: false, googleInfo: action.payload }
        case GOOGLE_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case GOOGLE_LOGOUT:
            return {}
        default:

            return state
    }
}
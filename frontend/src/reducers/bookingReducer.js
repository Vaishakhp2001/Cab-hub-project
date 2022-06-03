import {
 SEND_CONFIRMATION,TRIP_DETAILS ,DRIVER_CONFIRMATION,
 SHOW_DRIVER_DATA,GET_DRIVER_DATA
} from "../constants/bookingConstants";

export const confirmationReducer = (state = {},action) => {
    switch(action.type){
        case SEND_CONFIRMATION:
            return{ loading: true }
        case TRIP_DETAILS:
            return{ loading: false, tripDetails: action.payload }
        default:
            return state
    }

}

export const driverConfirmationReducer = (state = false,action) => {
    switch(action.type){
        case DRIVER_CONFIRMATION:
            return { driverConfirm : true }
        default:
            return state
    }
}

export const driverDataReducer = (state = {},action) => {
    switch(action.type){
        case GET_DRIVER_DATA:
            return { loading: true}
        case SHOW_DRIVER_DATA:
            return { driverInfo : action.payload}
        default:
            return state
    }
}


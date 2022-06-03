import {
    DRIVER_REACHED,
    REACHED_DESTINATION
    
} from '../constants/tripConstants'

export const driverReachedReducer = (state = {},action) => {
    switch (action.type) {
        case DRIVER_REACHED:
            return { reached: true }
        default:
            return state;
    }
}

export const reachedDestinationReducer = (state = {},action) => {

    switch (action.type) {
        case REACHED_DESTINATION:
            return { reachedDestination: true}
        default:
            return state;

    }
}
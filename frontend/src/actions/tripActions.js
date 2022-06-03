import {
    DRIVER_REACHED,
    REACHED_DESTINATION
    
} from '../constants/tripConstants'

export const driver_reached = () => async (dispatch) => {

    dispatch({
        type: DRIVER_REACHED
    })

}

export const reachedLocation = () => async (dispatch) => {

    dispatch({
        type: REACHED_DESTINATION
    })
}

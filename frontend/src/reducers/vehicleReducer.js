import { 
    
    GET_VEHICLE,
    SHOW_VEHICLE,
    GET_AVAILABLE_VEHICLES,
    SHOW_AVAILABLE_VEHICLES,
    GET_SELECTED_VEHICLE,
    SHOW_SELECTED_VEHICLE,
    EMPTY_VEHICLES,

} from '../constants/vehicleConstants'

export const getVehicleReducer = ( state = {}, action) => {
    switch (action.type) {
        case GET_VEHICLE:
            return{ loading: true } 
        case SHOW_VEHICLE:
            return{ loading: false, vehicles: action.payload}
        case EMPTY_VEHICLES:
            return {}
        default:
            return state;

    }
} 

export const getAvailableVehiclesReducer = ( state = {}, action ) => {
    switch(action.type){
        case GET_AVAILABLE_VEHICLES:
            return { loading: true }
        case SHOW_AVAILABLE_VEHICLES:
            return { loading1 : false, availableVehicle : action.payload }
        default:
            return state;
    }

}

export const getSelectedVehicleReducer = ( state = {}, action ) => {
    switch(action.type) {
        case GET_SELECTED_VEHICLE:
            return { loading: true }
        case SHOW_SELECTED_VEHICLE:
            return { loading: false, selectedVehicles : action.payload }
        default:
            return state;
    }
}

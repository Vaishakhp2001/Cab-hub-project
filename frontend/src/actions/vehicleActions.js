import { axiosInstance } from "../config";
import { 

    GET_VEHICLE,
    SHOW_VEHICLE,
    GET_AVAILABLE_VEHICLES,
    SHOW_AVAILABLE_VEHICLES,
    GET_SELECTED_VEHICLE,
    SHOW_SELECTED_VEHICLE,
    EMPTY_VEHICLES

} from "../constants/vehicleConstants";


export const get_vehicle = () => async(dispatch) => {

    console.log("getttttttttttttttttttttt")
    
    try{

        dispatch({
            type: GET_VEHICLE
        })

        const { data } =await axiosInstance.get('/api/vehicles')

        console.log("vehciles:",data)

        dispatch({
            type: SHOW_VEHICLE,
            payload: data
        })
    }
    catch (err) {
        console.log("error during fetchig vehicles: ",err)
    }

}

export const available_vehicles = (type) => async(dispatch) => {

    try {
        
        dispatch({
            type: GET_AVAILABLE_VEHICLES
        })

        console.log("show_available vehicles..")

        const { data } = await axiosInstance.get
        ('/api/vehicles/available', {params: { type : type }})

        console.log("avialble vehicles...",data)


        dispatch({
            type: SHOW_AVAILABLE_VEHICLES,
            payload: data
        })


    }
    
    catch(err) {
        console.log("err")
    }
}

export const selected_vehicle = (type) => async(dispatch) => {  

    try {

        dispatch({
            type: GET_SELECTED_VEHICLE
        })

        console.log("show_selected")

        const { data } = await axiosInstance.get
        ('/api/vehicles/selected/'+type)

        console.log("selected vehicle",data)

        

        dispatch({
            type: SHOW_SELECTED_VEHICLE,
            payload: data
        })

    }
    catch(err) {
        console.log("err")
    }
}

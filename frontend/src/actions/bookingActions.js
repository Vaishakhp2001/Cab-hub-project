import {axiosInstance} from '../config'
import { SEND_CONFIRMATION,TRIP_DETAILS,DRIVER_CONFIRMATION,GET_DRIVER_DATA,SHOW_DRIVER_DATA } from '../constants/bookingConstants'

export const send_confirmation = (Id, start) => async(dispatch) => {


    try{
        
        dispatch({
            type: SEND_CONFIRMATION
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axiosInstance.post(
            '/api/driver/confirmation',
            {Id,start},
            config
        )

        // console.log("tripdetailslllllllll:",data)
        
        dispatch({
            type: TRIP_DETAILS,
            payload:data

        })
    }

    catch(err) {
        console.log(err)
    }
    
}

export const driver_confirmed = (details) => async(dispatch) => {

    try{
        
        dispatch({
            type:DRIVER_CONFIRMATION,
        })

        const { data } = await axiosInstance.post(
            '/api/users/booktrip',details
        )
    }



    catch(err) {

        console.log(err)
    }
}

export const driver_data = (Id) => async(dispatch) => {
    
    try{

        dispatch({
            type:GET_DRIVER_DATA,
        })

        console.log("get driver data")

        const { data } = await axiosInstance.get(
            '/api/driver/info',
            {params: { Id : Id }}
        )

        console.log("driver data *******************",data)

        dispatch({
            type:SHOW_DRIVER_DATA,
            payload:data.result
        })

    }

    catch(err) {
        console.log(err)
    }
}
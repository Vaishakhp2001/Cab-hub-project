import {axiosInstance} from '../config'
import { DETAILS_UPLOAD_REQUEST,DRIVER_INFO_NULL,DETAILS_UPLOAD_ERROR } from "../constants/detailsConstants"

export const details = (vehicleType,vehicleImage,vehicleNumber,rcBookImage,rcbookNumber,drivingLicenceImage,drivingLicenceNumber) => async (dispatch) => {
    
    try {

        dispatch({
            type: DETAILS_UPLOAD_REQUEST
        })

        let driverInfo = localStorage.getItem('driverInfo')

        driverInfo = JSON.parse(driverInfo)

        const driverId = driverInfo._id

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        
        
        const { data } = await axiosInstance.post(
            '/api/driver/add_details',
            { vehicleType,vehicleImage,vehicleNumber,rcBookImage,rcbookNumber,drivingLicenceImage,drivingLicenceNumber,driverId },
            config 
        )
      
    } 
    catch (err) {
        
            console.log("error on upload",err.response.data.message)
            dispatch({
                type: DETAILS_UPLOAD_ERROR,
                payload: err.response.data.message

            })
        }
    }

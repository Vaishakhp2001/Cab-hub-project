import React, { useEffect,useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { available_vehicles } from '../actions/vehicleActions'
import Loader from '../components/Loader'   
import { send_confirmation } from '../actions/bookingActions'
import { io } from 'socket.io-client'
import Vehicle from './Vehicle'



const VehicleConfirm = () => {  

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const selected = useSelector(state => state.selectedVehicle)
    const { loading,selectedVehicles } = selected

    const available = useSelector(state => state.availableVehicles)
    const { loading1, availableVehicle } = available

    const measures = useSelector(state => state.distance)
    const { distance } = measures

    const location = useSelector(state => state.currentLocation)
    const { locationInfo } = location

    const startlocation = useSelector(state => state.pickUp)
    const { startCordinate } = startlocation

    const destination = useSelector(state => state.destination)
    const { endCordinate } = destination

    const [confirm,setConfirm] = useState(false)


    const showAvailableVehicles = (type) => {
        
        // navigate('/booking')

        setConfirm(true)

        dispatch(available_vehicles(type))

    }

    return (

        <div>
            
            { confirm  && <Loader/>}

            {loading1 && <Loader />}
            {loading && <Loader />}
            {!confirm && selectedVehicles &&
                <Card className='mt-2'>
                    <Card.Body>
                        <Card.Img src={selectedVehicles.image} style={{ width: '100px' }}></Card.Img>
                        <p>{selectedVehicles.vehicle_name}</p>
                        <p>₹{distance && ((distance.toFixed(0) / 1000) * selectedVehicles.charge).toFixed(0)}</p>
                    </Card.Body>
                    <Button onClick={() => showAvailableVehicles(selectedVehicles.vehicle_name)} >
                        Confirm
                    </Button>
                    <Button onClick={() => window.location.reload()} style={{marginTop:'10px'}}>
                        Cancel
                    </Button>
                </Card>}
            {/* {availableVehicle &&
                <Card>
                    <Card.Body>

                    </Card.Body>
                </Card>
            } */}
        </div>
    )
}

export default VehicleConfirm
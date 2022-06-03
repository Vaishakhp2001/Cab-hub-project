import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { driver_reached, reachedLocation } from '../actions/tripActions'
import { socket } from '../socket/socket'
import Payment from './Payment'

const DriverInformationScreen = () => {

    const [trackDriver, setTrackDriver] = useState(false)
    const [driverReached, setDriverReached] = useState(false)
    const driver = useSelector(state => state.driverData)
    const { driverInfo } = driver
    const { reachedDestination } = useSelector(state => state.reachedDestination)

    const dispatch = useDispatch()

    useEffect(() => {

        if (trackDriver) {
            setTimeout(() => {
                setDriverReached(true)
                setTrackDriver(false)
            }, 5000)
        }
        if (driverReached) {
            socket.emit("driver_reached", "driver reached")

        }


    }, [trackDriver, driverReached])

    useEffect(() => {

        socket.on('start_trip', data => {

            dispatch(driver_reached())

        })

        socket.on('reached_location', data => {

            dispatch(reachedLocation())


        })

    }, [socket])

    const cashPayment = () => {

        
    }
 



    return (
        <div>

            {reachedDestination ? <Payment/> :

            <Card style={{
                height: '14rem', marginTop: '11rem', width: '90%',
                marginLeft: '1.5rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }} >
                <Card.Header>
                    Vehicle Details
                </Card.Header>
                {trackDriver ?
                    <Card.Body>
                        <h5>Driver reach within 5 seconds</h5>
                        <Loader />
                    </Card.Body>

                    :
                    driverReached ? <>
                        <h4 style={{ margin: 'auto' }}>Driver Reached</h4>

                    </> :
                        <>
                            <Card.Body>
                                <h5>Vehicle Number : {driverInfo.vehicleNumber}</h5>
                                <h5>Driver Name : {driverInfo.driverId.name}</h5>
                                <h5>Code : {(driverInfo.driverId._id).slice(-4)}</h5>
                            </Card.Body>
                            <Button style={{ margin: '10px' }} onClick={() => setTrackDriver(true)}>
                                Track vehicle
                            </Button> </>}
            </Card> }

        </div>
    )
}

export default DriverInformationScreen
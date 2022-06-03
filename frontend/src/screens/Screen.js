import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { BiTime, BiCurrentLocation } from 'react-icons/bi';
import ScreenForm from '../components/ScreenForm';
import { useDispatch, useSelector } from 'react-redux';
import { search_pickup, select_pickup, search_destination, select_destination, show_vehicles, current_location, show_distance } from '../actions/locationActions';
import Loader from '../components/Loader';
import Vehicle from './Vehicle';
import VehicleConfirm from './VehicleConfirm'
import { io } from 'socket.io-client';
import { send_confirmation, driver_data } from '../actions/bookingActions';
import DriverInformationScreen from './DriverInformationScreen';
import { getUser } from '../actions/userActions'
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket/socket';  

// const socket = io("http://localhost:5000")

// socket.on("message", data => {
//     console.log("data from user", data)
// })


const Screen = () => {
    // const [socket, setSocket] = useState([])
    const [pickup, setPickup] = useState('')
    const [currentLocaton, setCurrentLocation] = useState(true)
    const [destination, setDestination] = useState('')
    const [locations, setLocations] = useState([])
    const [destinations, setDestinations] = useState([])
    const [pickupcordinate, setPickupCordinate] = useState([])
    const [destinationcordinate, setDestinationCordinate] = useState([])
    const [showContainer, setShowContaienr] = useState(false)
    var places;
    var dest;


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.userInfo)

    const confirm = useSelector(state => state.driverConfirmation)
    const { driverConfirm } = confirm

    const driver = useSelector(state => state.driverData)
    const { driverInfo } = driver

    const location1 = useSelector(state => state.pickUp)
    const { locationInfo1 } = location1

    const location2 = useSelector(state => state.destination)
    const { locationInfo2 } = location2

    // const geometry = useSelector(state => state.direction)
    // const { directionInfo, distance, duration } = geometry

    const location = useSelector(state => state.currentLocation)
    const { locationInfo } = location

    const selected = useSelector(state => state.selectedVehicle)
    const { selectedVehicles } = selected

    const available = useSelector(state => state.availableVehicles)
    let { loading1, availableVehicle } = available

    const { distance } = useSelector(state => state.distance)

    const { startCordinate } = useSelector(state => state.pickUp)

    const { endCordinate } = useSelector(state => state.destination)


    const starting = (place) => {
        setDestination([])
        setPickup(place)
        dispatch(search_pickup(place))
        locationInfo1 ? setLocations(locationInfo1.features) : setLocations([])
    }

    const ending = (place) => {
        setLocations([])
        setDestination(place)
        dispatch(search_destination(place))
        { locationInfo2 ? setDestinations(locationInfo2.features) : setDestinations([]) }
    }

    const startSelect = (coordinate, location) => {
        setPickupCordinate(coordinate)
        setPickup(location)
        setLocations([])

    }

    const endSelect = (coordinate, location) => {
        setDestinationCordinate(coordinate)
        setDestination(location)
        console.log("Destinatin : ", coordinate, location)
        setDestinations([])
    }

    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            dispatch(select_pickup([position.coords.longitude, position.coords.latitude]))
            dispatch(current_location(position.coords.latitude, position.coords.longitude))
            setCurrentLocation(false)
            setShowContaienr(false)
            setPickupCordinate(position.coords.longitude, position.coords.latitude)

        })
    }

    const changeLocation = () => {

        setPickup('')
        setShowContaienr(false)

    }

    useEffect(() => {

        if (!startCordinate || !endCordinate) return;
        dispatch(show_distance(startCordinate, endCordinate))

    }, [startCordinate, endCordinate])

    useEffect(() => {

            socket.on('driver_info', (data) => {
                console.log("this is the data after driver confirmation >.......", data, "socket Id: ", socket.id)
                dispatch(driver_data(data))
            })

            socket.on("driver_rejected", (data) => {

                // console.log("rejected message : ", data)

            })

            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
            });

        return() => {
            socket.on("disconnect")
        }

    }, [socket])





    useEffect(() => {

        dispatch(getUser())

        if (!userInfo) return;

        console.log("userInfo", userInfo)

        const user = JSON.parse(userInfo.user)

        const userId = user._id

        if (availableVehicle) {
            
            console.log("available vehicles :",availableVehicle)

            // setSocket(socket)

            socket.emit("message", { _id: availableVehicle.result[0]._id,driverId: availableVehicle.result[0].driverId._id ,
                location1: pickup,location2:destination, userId, coordinate: pickupcordinate,destinationcordinate ,distance });

            console.log("datas send to driver : ", availableVehicle.result[0]._id, pickup)

            dispatch(send_confirmation(availableVehicle.result[0]._id, pickup))

            // console.log("sockeeettttttt:", socket)

        }

    }, [availableVehicle, userInfo])



    useEffect(() => {

        locationInfo ? (
            setPickup(locationInfo)
        )
            : setPickup('')
        console.log("locationcurrrent", locationInfo)



    }, [locationInfo])



    useEffect(() => {

        if (pickupcordinate.length) {

            dispatch(select_pickup(pickupcordinate))
        }

    }, [pickupcordinate])

    useEffect(() => {
        
        if (destinationcordinate.length) {

            dispatch(select_destination(destinationcordinate))
        }


    }, [destinationcordinate])


    return (

        <div style={{
            width: '35%', height: 520, backgroundColor: '#FFFFFF',
            margin: 30, position: 'absolute', borderRadius: '25px', textAlign: 'center', overflow: 'hidden'
        }} className=''>

            {driverInfo &&

                <DriverInformationScreen />}

            {availableVehicle ?

                <div style={{ marginTop: '10rem' }}>
                    <h5>Searching for drivers</h5><br />
                    <Loader />

                </div> :

                <ScreenForm>

                    <h4 >Where you want to go?</h4>
                    <Form>
                        <Form.Group >

                            <Form.Control
                                type='text'
                                placeholder='Enter pickup location'
                                value={pickup}
                                onChange={((e) => starting(e.target.value))}
                                onClick={setShowContaienr}
                                className='mt-3'

                            >
                            </Form.Control>
                            {showContainer && (<Button style={{ marginTop: '10px' }} >
                                <Row>
                                    {currentLocaton ? <Col onClick={getCurrentPosition}><BiCurrentLocation />Choose current location</Col> :
                                        <Col onClick={changeLocation}><BiCurrentLocation />Change location</Col>}
                                </Row>
                            </Button>)}

                            <Form.Control
                                type='text'
                                placeholder='Enter destination location'
                                value={destination}
                                onChange={((e) => ending(e.target.value))}
                                className='mt-3'
                            >
                            </Form.Control>

                            {/* schedule button*/}

                            {/* <Button
                                style={{ width: '100%' }}
                                className='mt-3'

                            ><BiTime style={{ width: 30 }} /> Schedule Trip

                            </Button> */}



                        </Form.Group>

                    </Form>



                    <div className='locations'>

                        {

                            locations.length > 0 && pickup.length > 0 ?
                                places = locations.map((obj) => {
                                    return (
                                        <div style={{
                                            backgroundColor: '#ffff', cursor: 'pointer', height: '5rem', width: '80%',
                                            marginTop: '8px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                        }} className='mx-auto'>
                                            <p id='pickup' onClick={() => startSelect(obj.center, obj.place_name)}>{obj.place_name}</p>
                                        </div>
                                    )
                                }) : <></>


                        }
                        {
                            destinations.length > 0 && destination.length > 0 ?
                                dest = destinations.map((obj) => {
                                    return (
                                        <div style={{
                                            backgroundColor: '#ffff', cursor: 'pointer', height: '5rem', width: '80%',
                                            marginTop: '8px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                        }} className='mx-auto'>
                                            <p id='destination' onClick={() => endSelect(obj.center, obj.place_name)}>{obj.place_name}</p>
                                        </div>
                                    )
                                }) : <></>
                        }

                        {/* {
                // !destinations.length && !locations.length ? <Vehicle /> : <></>
                directionInfo ? <Vehicle /> : <></>

            } */}

                        {
                            selectedVehicles ? <VehicleConfirm /> : distance ? <Vehicle /> : <></>
                        }
                        {/* <Vehicle/> */}

                    </div>



                </ScreenForm>

            }



        </div >

    )
}


export { Screen }
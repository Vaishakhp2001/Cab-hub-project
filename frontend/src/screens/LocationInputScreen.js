import React, { useState,useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { search_pickup, select_pickup, search_destination, select_destination, show_vehicles, current_location, show_distance } from '../actions/locationActions';
import { BiTime, BiCurrentLocation } from 'react-icons/bi';


const LocationInputScreen = () => {

    const dispatch = useDispatch()

    const [pickup, setPickup] = useState('')
    const [currentLocaton, setCurrentLocation] = useState(true)
    const [destination, setDestination] = useState('')
    const [showContainer, setShowContaienr] = useState(false)
    const [locations, setLocations] = useState([])
    const [destinations, setDestinations] = useState([])
    const [pickupcordinate, setPickupCordinate] = useState([])
    const [destinationcordinate, setDestinationCordinate] = useState([])


    const location1 = useSelector(state => state.pickUp)
    const { locationInfo1 } = location1

    const location2 = useSelector(state => state.destination)
    const { locationInfo2 } = location2

    const location = useSelector(state => state.currentLocation)
    const { locationInfo } = location


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




    return (
        <div>
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
        </div>
    )
}

export default LocationInputScreen
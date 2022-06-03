import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import io, { Socket } from 'socket.io-client'
import { GoLocation } from 'react-icons/go'
import { driver_confirmed } from '../actions/bookingActions'
import { getDriver } from '../actions/driverActions'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { axiosInstance } from '../config'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import VerifyPin from './VerifyPin'
import { driverCurrentLocation } from '../actions/driverActions'
import { socket } from '../socket/socket'



const DriverScreen = () => {

    const dispatch = useDispatch()

    const [id, setId] = useState()
    const [location, setLocation] = useState('')
    const [location1, setLocation1] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [reached, setReached] = useState(false)
    const [position,setPosition] = useState()
    const { driverInfo } = useSelector(state => state.driverInfo)
    const [trip,setTrip] = useState({})

    const { loading, availableVehicle } = useSelector(state => state.availableVehicles)

    const { distance } = useSelector(state => state.distance)

    const { selectedVehicles } = useSelector(state => state.selectedVehicle)

    const { locationInfo2,endCordinate } = useSelector(state => state.destination)

    const navigate = useNavigate() 

    // const connect = () => {
        
    //     socket = io("http://localhost:5000")

    // }

    // useEffect(() => {
    //     connect()
    // },[])

    socket.on("data", data => {
        console.log("distance : : : ;;:::;;;;:::::L",data) 
    })

    useEffect(() => {

        dispatch(getDriver())

    
        socket.on("reached_pickup", data => {
    
            console.log('driver reached at pickup', data)
    
            setReached(true)
    
        })

 
        console.log("driverInfo",driverInfo)
        
        if(driverInfo){

            const driver = JSON.parse(driverInfo.driver)
            
            setId(driver._id)
            
            console.log("driver:",driver._id)  

            socket.on("data", (data) => {

                if(data.driverId === driver._id){

                    console.log("location form serveeeeeeeeer:", data)
        
                    setTrip(data)
            
                    setLocation(data.location1) 

                }

        
            })

        }

        if(id) {

            var intervel = setInterval(() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(id)
                    setPosition(position)
                    dispatch(driverCurrentLocation(id,position.coords.longitude, position.coords.latitude)) 
                })
                 
            },10000)

        }

        if(confirm){
            
            navigate("/driver/verify_pin")  
        }



        // return () => {
        //     clearInterval(intervel)
        // }

        

    },[confirm,driverInfo])

    useEffect(() => {
        if(trip){
            console.log('trip detajls:L0',trip)
        }
    },[trip])

    
    
    const confirmTrip = () => {

        console.log("data:",id,selectedVehicles,distance,locationInfo2,endCordinate)
        
        if ( id ) {

            // if ( id && selectedVehicles && distance && locationInfo2 && endCordinate ) {
            
            // console.log("Id", driverInfo._id)
            // const Id = driverInfo._id
            const data = trip

            data.driverId = id

            data.distance = distance

            // data.amount = ((distance.toFixed(0) / 1000) * selectedVehicles.charge).toFixed(0) 

            data.destination = locationInfo2

            data.destinationCoordinate = endCordinate

            socket.emit("confirmation", data)
            
            dispatch(driver_confirmed(data))
            // navigator.geolocation.getCurrentPosition((position) => {
    
            //     console.log("currentLocation:", Id, position.coords.latitude, position.coords.longitude)
    
    
            // })
    
        }

        // setLocation('')
 
        setConfirm(true)

        setLocation('')

        console.log("trip confirmation...", socket)

        // io.to(socket.id).emit('confirmation',location)
        
        // let driverInfo = localStorage.getItem('driverInfo')
        // driverInfo = JSON.parse(driverInfo)
        
        

    }



    const cancelTrip = () => {

        setLocation('')

        socket.emit("cancel_trip", socket.id)

    }

    const submitPincode = () => {

        axiosInstance.get('/api/driver/verify_pin')
        
        
    }


    return ( 
        <div style={{
            width: 450, height: 520, backgroundColor: '#FFFFFF',
            margin: 30, position: 'absolute', borderRadius: '25px', textAlign: 'center', overflow: 'hidden'
        }}>
            <div className='mx-auto'>

                <h4 className='mt-4'>Notifications</h4>

                {confirm && <VerifyPin/>}

                {location ?
                    <Card style={{ width: '20rem', marginLeft: '4rem', marginTop: '5rem' }}>
                        <Card.Body>
                            {/* <GoLocation /> */}
                            <h5 >From:{location}</h5>

                            <h5></h5>
                        </Card.Body>
                        <Button onClick={confirmTrip}>
                            Confirm
                        </Button><br />
                        <Button onClick={cancelTrip}>
                            Cancel
                        </Button>
                    </Card> :  <h3 style={{ marginTop: '10rem' }}>No Notifications</h3>}

                

            </div>

        </div>
    )
}



export { DriverScreen,socket }
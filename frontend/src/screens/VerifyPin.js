import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { axiosInstance } from '../config'
import { useDispatch } from 'react-redux'
import { socket } from './DriverScreen'
import DriverPaymentScreen from './DriverPaymentScreen'
import { useNavigate } from 'react-router-dom'


const VerifyPin = () => {

    const [pin, setPin] = useState('')

    const [showBtn,setShowBtn] = useState(false)

    const [payment, setPayment] = useState(false)
     
    const navigate = useNavigate()

    const submitPincode =async (e) => {

        setShowBtn(true)

        e.preventDefault()

        console.log("pin verify ?")

        const { data } = await axiosInstance.get("/api/driver/verify_pin/"+pin)

        console.log("data",data)

        if(data) {

            console.log("resonse after verify pin : ",data)
            
            socket.emit('pin_verified',"start trip")

        }

    }

    const reachedDestination = () => {

        socket.emit('reached_destination',"reached")

        setShowBtn(false)

        setPayment(true)

    }

    



    return (
        <>
            {payment && <DriverPaymentScreen/>}

            
            <Card style={{ width: '20rem', marginLeft: '4rem', marginTop: '11rem' }}>

                {showBtn ? <Card.Body>

                    <h4>Reached at destination</h4>

                    <Button type='submit' className='mt-2' onClick={reachedDestination}>Reached</Button>

                </Card.Body> :

                <Card.Body>
                    
                        <h5>Enter pincode</h5>
                        <Form.Control placeholder='4 Digit pin-code' style={{ borderColor: 'black' }}  onChange={(e) => setPin(e.target.value)}/>
                   
                    <Button type='submit' className='mt-2' onClick={submitPincode}>Submit</Button>
                </Card.Body> }
            </Card>
        </>
    )
}

export default VerifyPin
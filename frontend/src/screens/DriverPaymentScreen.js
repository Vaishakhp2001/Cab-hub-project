import React from 'react'
import Loader from '../components/Loader'
import { Card } from 'react-bootstrap'

const DriverPaymentScreen = () => {
    return (
        <div>
            <Card style={{ width: '20rem', marginLeft: '4rem', marginTop: '11rem' }}>
                <h3>Waiting for payment</h3>
                <Loader />
            </Card>
        </div>
    )
}

export default DriverPaymentScreen
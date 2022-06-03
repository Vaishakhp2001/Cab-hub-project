import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { Screen } from '../screens/Screen'
import Loader from '../components/Loader'

const Bookingpage = () => {

    const available = useSelector(state => state.availableVehicles)
    let { loading1, availableVehicle } = available

    return (
        <div>
            <Header />
            <div style={{ width: '100%', height: '90vh', position: 'relative', backgroundColor: 'white' }}>
                <HomeScreen />
                <Screen >
                    
                </Screen>
            </div>

        </div>
    )
}

export default Bookingpage
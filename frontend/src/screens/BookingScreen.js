import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import HomeScreen from './HomeScreen'
import { Screen } from './Screen'


const BookingScreen = () => {

  const available = useSelector(state => state.availableVehicles)
    let { loading1, availableVehicle } = available


  return (
    <div>
      
       {loading1 && <Loader/> }
       
      
    </div>
  )
}

export default BookingScreen
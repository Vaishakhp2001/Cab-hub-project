import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css'
import { Container } from 'react-bootstrap';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Header from '../components/Header'
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen'
import UploadScreen from '../screens/UploadScreen';
import DriverHomeScreen from '../screens/DriverHomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from  '../screens/ProfileScreen'
import VehicleConfirm from '../screens/VehicleConfirm';
import { Screen } from '../screens/Screen';
import VerifyPin from '../screens/VerifyPin';
import Homepage from '../pages/Homepage';
import Bookingpage from '../pages/Bookingpage';
import Trips from '../screens/TripsScreen'

const user = localStorage.getItem('userInfo')

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<><Homepage/></> } />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path="/signup" element={<RegisterScreen/>} />
        <Route path="/driver/add_details" element={<UploadScreen/>} />
        <Route path='/driver' element={<DriverHomeScreen/>} />
        <Route path='/booking' element={<Bookingpage/>} />
        <Route path='/profile' element={<><Header/><ProfileScreen data={user}/></>} />
        <Route path='/confirm_vehicle' element={<><HomeScreen><VehicleConfirm/></HomeScreen></>} />
        <Route path="/driver/verify_pin" element={<><DriverHomeScreen></DriverHomeScreen></>} />
        <Route path='/trips' element={<Trips/>} />
      </Routes>
    </Router>

  )
}


export default App
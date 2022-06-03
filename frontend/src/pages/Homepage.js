import React from 'react'
import { Col,Container,Row } from 'react-bootstrap'
import Header from '../components/Header'
import HomeScreen from '../screens/HomeScreen'
import { Screen } from '../screens/Screen'

const Homepage = () => {
  return (
    <div>
    
       
        <Header/>
        <div style={{ width: '100%', height: '90vh', position: 'relative', backgroundColor: 'white' }}>
         
            <HomeScreen />
         

         

            <Screen/>
         
         
          
        </div>
       
       
    </div>
  )
}

export default Homepage
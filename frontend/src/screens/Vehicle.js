import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { show_direction, show_distance, show_duration } from '../actions/locationActions'
import { get_vehicle, available_vehicles, selected_vehicle } from '../actions/vehicleActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import VehicleConfirm from './VehicleConfirm'


const Vehicle = () => {

  const [error,setError] = useState('')

  const location1 = useSelector(state => state.pickUp)
  const { startCordinate } = location1;

  const location2 = useSelector(state => state.destination)
  const { endCordinate } = location2;

  const measures = useSelector(state => state.distance)
  let { distance } = measures

  const measures1 = useSelector(state => state.duration)
  let { duration } = measures1

  const allvehicles = useSelector(state => state.vehicles)
  const { loading, vehicles } = allvehicles

  const available = useSelector(state => state.availableVehicles)
  const { loading1, availableVehicle } = available

  const selected = useSelector(state => state.selectedVehicle)
  const { selectedVehicles } = selected

  const [confirm, setConfirm] = useState('')

  const [select,setSelect] =  useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    dispatch(get_vehicle())

    // getDistance()

  }, [startCordinate, endCordinate])


  // const getDistance = () => {

  //   if (!startCordinate || !endCordinate) return;
  //   dispatch(show_distance(startCordinate, endCordinate))
  //   dispatch(show_duration(startCordinate, endCordinate))

  // }

  const showAvailableVehicles = (type) => {
    setConfirm(type)
    dispatch(available_vehicles(type))
  }

  const selectVehicle = (type) => {

    setSelect(true)


    if(distance > 1000 ) {
      
      // navigate('/confirm_vehicle')

      dispatch(selected_vehicle(type))

    }

    else {

      setError('Trip have atlest 1Km distance')
      
      return;
    }
  }


  return (  

    <div>
    
      <div>

        {select && <VehicleConfirm/> }
       
        {!select && vehicles && <h4 className='mt-2' >Select Vehicle</h4> }
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader className='mt-3'/>}
        <div style={{ height: '15rem' }} className='show-vehicle'>
          {!select && vehicles && vehicles.map((obj) => {
            return (
              <Card className='z-depth-5' style={{
                cursor: 'pointer', width: '90%', margin: 'auto',
                marginTop: '10px', boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px'
              }} onClick={() => selectVehicle(obj.vehicle_name)} >
                <Card.Body>

                  <Card.Img src={obj.image} style={{ width: '80px' }}></Card.Img>

                  <div style={{ float: 'right' }}>
                    <h5 >{obj.vehicle_name}</h5><br/>
                    { distance > 20 ? <p >₹{(distance.toFixed(0) / 1000 * obj.charge).toFixed(0)}</p> : <p>{obj.speed}/km</p> }
                  </div>

                  {/* {duration ? <h5 style={{ float: 'right' }}>{duration.toFixed(1)/60}Minuts</h5> : <></>} */}
                </Card.Body>
              </Card>
            )

          }) }

        </div>
      </div>
     
    
    </div>

  )

}


export default Vehicle





// { confirm ? <Card className='z-depth-5' style={{
//   cursor: 'pointer', width: '90%', margin: 'auto',
//   marginTop: '10px', boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px'
// }} onClick={() => showAvailableVehicles(obj.vehicle_name)} >
//   <Card.Body>

//     <Card.Img src={obj.image} style={{ width: '80px' }}></Card.Img>

//     <div style={{ float: 'right' }}>
//       <h5 >{obj.vehicle_name}</h5><br />
//       {distance ? <p >₹{(distance.toFixed(0) / 1000 * obj.charge).toFixed(0)}</p> : <></>}


//     </div>

//     {/* {duration ? <h5 style={{ float: 'right' }}>{duration.toFixed(1)/60}Minuts</h5> : <></>} */}
//   </Card.Body>
// </Card> : <></> }
import React,{ useEffect,useState } from 'react'
import { Form,Button,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader';
import DetailsFormContainer from '../components/FormContainer'
import { useDispatch,useSelector } from 'react-redux';
import { details } from '../actions/detailsActions'
import { useNavigate } from 'react-router-dom';


const UploadScreen = () => {
   const [vehicleType,setVehicleType] = useState('')
   const [vehicleImage,setVehicleImage] = useState('')
   const [vehicleNumber,setVehicleNumber] = useState('')
   const [rcBookImage,setRCBookImage] = useState('')
   const [rcbookNumber,setRCBookNumber] = useState('')
   const [drivingLicenceImage,setDrivingLicenceImage] = useState('')
   const [drivingLicenceNumber,setDrivingLicenceNumber] = useState('')

   const navigate = useNavigate()
 
   const dispatch = useDispatch()

   const errors = useSelector(state => state.detailsUpload)
   const { error }  = errors
   
   const handleSubmit = (e) => {

       e.preventDefault()

       const driverInfo = localStorage.getItem('driverInfo')

       if(!driverInfo){
            navigate('/login')
       }
       
       dispatch(details(vehicleType,vehicleImage,vehicleNumber,rcBookImage,rcbookNumber,drivingLicenceImage,drivingLicenceNumber))

       
   }
   

   const showPreview1 = (e) => {
        
        // setRCBookImage(e.target.files[0])
        // setDrivingLicenceImage(e.target.files[0])
        const reader1 = new FileReader();
       
        reader1.readAsDataURL(e.target.files[0]);
       
        reader1.onloadend = () => {
            
            if(e.target.id = 'vehicle') {
               
               setVehicleImage(reader1.result) 
               
            } 
          
        }
       
    }

    const showPreview2 = (e) => {
        
        // setRCBookImage(e.target.files[0])
        // setDrivingLicenceImage(e.target.files[0])
        const reader2 = new FileReader();
       
        reader2.readAsDataURL(e.target.files[0]);
       
        reader2.onloadend = () => {
            
           
               console.log(reader2)
               setRCBookImage(reader2.result) 
               
            
          
        }
       
    }

    const showPreview3 = (e) => {
        
        // setRCBookImage(e.target.files[0])
        // setDrivingLicenceImage(e.target.files[0])
        const reader3 = new FileReader();
       
        reader3.readAsDataURL(e.target.files[0]);
       
        reader3.onloadend = () => {
            
            if(e.target.id = 'drivinglicence') {
               
                setDrivingLicenceImage(reader3.result) 
               
            } 
          
        }
       
    }


   return (
    <div>
    <DetailsFormContainer>
        <h1>Add Details</h1>
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={handleSubmit}>
        <Form.Group >
               
                <Form.Select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                    <option>Select vehicle</option>
                    <option>Mini</option>
                    <option>Auto</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                </Form.Select>

                <Form.Label>Add vehicle photo</Form.Label>
                <Form.Control
                    type='file'
                    id='vehicle'
                    onChange={(e) => showPreview1(e)}
                > 
                </Form.Control>

                { vehicleImage ? <img src={vehicleImage} style={{ height:200,width:'100%', marginTop:10, marginBottom: 10}}></img> : <></>}
               
                <Form.Label>Enter Vehicle Number</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter vehicle number'
                    onChange={(e) => setVehicleNumber(e.target.value)}
                > 
                </Form.Control>

                <Form.Label>Add RC Book photo</Form.Label>
                <Form.Control
                    type='file'
                    id='rcbook'
                    onChange={(e) => showPreview2(e)}
                > 
                </Form.Control>

                { rcBookImage && <img src={rcBookImage} style={{ height:200,width:'100%', marginTop:10, marginBottom: 10}}></img> }
               
                <Form.Label>Enter RC Book Number</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter RC Book number'
                    onChange={(e) => setRCBookNumber(e.target.value)}
                > 
                </Form.Control>

                <Form.Label>Add Driving Licence photo</Form.Label>
                <Form.Control
                    type='file'
                    id='drivinglicence'
                    onChange={(e) => showPreview3(e)}
                > 
                </Form.Control>

                { drivingLicenceImage && <img src={drivingLicenceImage} style={{ height:200,width:'100%', marginTop:10, marginBottom: 10}}></img> }
                
                <Form.Label>Enter Driving Licence Number</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Driving Licence number'
                    onChange={(e) => setDrivingLicenceNumber(e.target.value)}
                > 
                </Form.Control>
           
            </Form.Group>

           

            <Button type='submit' variant='primary' className='mt-3'>
                Upload
            </Button>   
        </Form>

       
    </DetailsFormContainer>
    


    </div>
  )
}

export default UploadScreen
import '../styles/profile.css'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { axiosInstance } from '../config'
import { getUser } from '../actions/userActions'


const ProfileScreen = () => {

    const { userInfo } = useSelector(state => state.userInfo)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [id, setId] = useState('')

    const [userProfile,setUserProfile] = useState()

    const getUserProfle = async () => {

        const { data } = await axiosInstance.get("/api/users/profile/" + id)

        console.log("data ", data)

        setUserProfile(data)

    }


    useEffect(() => {

        dispatch(getUser())

        if(userInfo) {

            console.log(userInfo.user)

            const user = JSON.parse(userInfo.user)

            setId(user._id)

            setUserProfile(user)

        }

        if( userProfile ) {

            console.log("profle:",userProfile)

        }

        if(id) {

            getUserProfle()
            
        }
 
    }, [userInfo])

    

    return (
        <>

        {userProfile &&
            <Container className='profile_contaier  mt-5' >

                <Row>
                    <Col xl={4} lg={4} md={4} sm={4} className='profile_col1'>

                        <div className='photo_box'>

                            <img className='profile_photo' alt='' src='https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png'></img>

                        </div>

                        <h3 className='mt-4'></h3>

                        <Form>
                            <div className='input_H mt-4'>

                                <div className='mt-4'>

                                    <Button type='submit' className='weight-btn' >Edit</Button>
                                </div>
                            </div>
                        </Form>


                    </Col>
                    <Col xl={8} lg={8} md={8} sm={8} className='profile_col'>
                        <div className='outer'>
                            <Form >
                                <div className='label-container'>
                                    <Form.Label className='label' >Name :</Form.Label>
                                    <Form.Control className='inputF' placeholder={userProfile.name}   sx={{ width: '90%' }} name='name' />
                                </div>

                                <div className='label-container '>
                                    <Form.Label className='label' >Mob :</Form.Label>
                                    <Form.Control className='inputF' placeholder={userProfile.phone}  sx={{ width: '90%' }} />

                                </div>
                                <div className='label-container'>
                                    <Form.Label className='label' >Email :</Form.Label>
                                    <Form.Control className='inputF' placeholder={userProfile.email}  sx={{ width: '90%' }} />
                                </div>


                                <Button type='submit' className='my-4 mx-2' >
                                    Edit Profile

                                </Button>

                            </Form>
                        </div>
                    </Col>
                </Row>

            </Container> }
        </>

    )
}
export default ProfileScreen
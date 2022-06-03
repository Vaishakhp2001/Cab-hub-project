import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { login as driverSignin } from '../actions/driverActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import GoogleLogin from '../components/LoginGoogle'


const LoginScreen = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userStatus, setUserStatus] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const driverLogin = useSelector(state => state.driverLogin)
    const { loading1, error1, driverInfo } = driverLogin


    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo ])

    useEffect(() => {
        if(driverInfo) {
            navigate('/driver')
        }
    },[navigate,driverInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        if(userStatus){
            dispatch(login(email, password))
        }
        else{
            console.log("driver login")
            dispatch(driverSignin(email,password))
        }
    }

    const changeStatus = () => {
        if(userStatus){
            setUserStatus(false)
        }
        else {
            setUserStatus(true)
        }
    }

    return <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}

    {error1 && <Message variant='danger'>Invalid credentials</Message>}
        {loading1 && <Loader/>}
       
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Email Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group style={{marginTop: '5px'}}>
                <Form.Check
                 onChange={changeStatus}
                 type='checkbox'
                 id="custom-switch"
                 label="Login as user">
                   
                </Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3' >
                Sign In
            </Button>
            <GoogleLogin style={{float:'left'}} />
        </Form>

        <Row className='py-3'>
            <Col>
               New Customer? 
               <Link to={ '/signup'} >
                   Register
               </Link>
            </Col>
        </Row>
       
    </FormContainer>
    
}

export default LoginScreen
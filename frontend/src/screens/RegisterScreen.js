import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { register as registerAction } from '../actions/userActions'
import { register as driverRegistration} from '../actions/driverActions'
import Message from '../components/Message'
import Loader from '../components/Loader'



const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [userStatus, setUserStatus] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)
    const { loading1, error1, userInfo } = userRegister

    const driverRegister = useSelector(state => state.driverRegister)
    const { loading, error, driverInfo } = driverRegister

    const submitHandler = (e) => {
        e.preventDefault();
        if(userStatus) {

            dispatch(registerAction(name, email, phone, password))
        }
        else {
            dispatch(driverRegistration(name, email, phone, password))

        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/login')
        }
    }, [navigate, userInfo])

    useEffect(() => {
        if (driverInfo) {
            navigate('/login')
        }
    }, [navigate, driverInfo])


    const changeStatus = () => {
        if(userStatus){
            setUserStatus(false)
        }
        else {
            setUserStatus(true)
        }
    }

    return <FormContainer>
        <h1>Sign Up</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        {error1 && <Message variant='danger'>{error1}</Message>}
        {loading1 && <Loader />}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                {/* <Form.Label>User Name</Form.Label> */}
                <Form.Control
                    style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #000000'
                    }}
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                {/* <Form.Label>Email Address</Form.Label> */}
                <Form.Control
                    style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #000000'
                    }}
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
                {/* <Form.Label>Enter phone</Form.Label> */}
                <Form.Control
                    style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #000000'
                    }}
                    type='text'
                    placeholder='Enter phone number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                {/* <Form.Label>Enter Password</Form.Label> */}
                <Form.Control
                    style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #000000'
                    }}
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                {/* <Form.Label>confirmPassword</Form.Label> */}
                <Form.Control
                    style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #000000'
                    }}
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >   
                </Form.Control>
            </Form.Group>
            <Form.Group style={{marginTop: '5px'}}>
                <Form.Check
                 onChange={changeStatus}
                 type='checkbox'
                 id="custom-switch"
                 label="Register as new user">
                   
                </Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
                Sign Up
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            Already registered?<Link to={'/login'}> Login</Link>

            </Col>
        </Row>
    </FormContainer>
}

export default RegisterScreen
import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // const userLogin = useSelector(state => state.userLogin)
  // let { userInfo } = userLogin

  const googleLogin = useSelector(state => state.googleLogin)
  let { googleInfo } = googleLogin

  // console.log("userInfo:",userInfo)
  
  const logoutHandler = () => {
  
    dispatch(logout())
    console.log('logout')

  }

  const profileHandler = () => {
    navigate('/profile')
    
  }

  const tripsHandler = () => {
    navigate('/trips')
  }

  let user = localStorage.getItem('userInfo')
  const userInfo = JSON.parse(user)
  

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg"  collapseOnSelect>
        <Container>
          <Navbar.Brand className='' href="/">Cab Hub</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className='justify-content-end flex-grow-1 pe-1'>

               { userInfo ? (
                 <NavDropdown title={userInfo.name } id='username'>
                   <NavDropdown.Item onClick={logoutHandler}>
                     Logout
                   </NavDropdown.Item><br/>
                   <NavDropdown.Item onClick={profileHandler}>
                     Profile Settings
                   </NavDropdown.Item><br/>
                   <NavDropdown.Item onClick={tripsHandler}>
                     MyTrips
                   </NavDropdown.Item>
                 </NavDropdown>
               ) : <LinkContainer to='/login'>
                 <Nav.Link>
                   <i className='fas fa-user'></i> Sign In
                 </Nav.Link>
                 </LinkContainer> }
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
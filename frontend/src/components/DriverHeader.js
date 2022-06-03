import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/driverActions'

const DriverHeader = () => {

  const dispatch = useDispatch()

  // const driverLogin = useSelector(state => state.driverLogin)
  // const { driverInfo } = driverLogin

  // console.log("driverInfo:",driverLogin)

  let driver = localStorage.getItem('driverInfo')
  const driverInfo = JSON.parse(driver)
  

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg"  collapseOnSelect>
        <Container>
          <Navbar.Brand className='' href="/">Cab Hub</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='justify-content-end flex-grow-1 pe-1'>
               { driverInfo ? ( 
                 <NavDropdown title={driverInfo.name} id='username'>
                   <NavDropdown.Item onClick={logoutHandler}>
                     Logout
                   </NavDropdown.Item>
                 </NavDropdown>
               ) : <LinkContainer to='/login'>
                 <Nav.Link>
                   <i className='fas fa-user'></i> Sign In
                 </Nav.Link>
                 </LinkContainer>}
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default DriverHeader
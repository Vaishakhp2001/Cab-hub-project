import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5" >
                <Col xs={12} md={6} style={{backgroundColor:'white',
                     boxShadow:' rgba(0, 0, 0, 0.35) 0px 5px 15px',
                     padding:'50px',width:'500px'}} >
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
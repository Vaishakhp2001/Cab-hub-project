import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'

const DetailsFormContainer = ({ children }) => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={4}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default DetailsFormContainer
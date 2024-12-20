import React from 'react'
import { Container, Col, Button, Row } from 'react-bootstrap'

const Hero = () => {
  return (
    <div className='p-5 text-center' >
      <Container>
        <Row className='align-items-center' >
        <Col>
            <h1>Welcome to My site</h1>
            <Button>
                Get Started
            </Button>
        </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero

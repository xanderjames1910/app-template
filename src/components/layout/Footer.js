import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

class Footer extends Component {
  render() {
    return (
      <Jumbotron className='footer mb-0 p-0 pt-2 pt-md-4 pb-3'>
        <Container>
          <Row className='mb-3 mt-0'>
            <Col xs={12} md={4} className='justify-content-center custom-vertical-align text-center my-3 my-md-0'>
              <div>
                <LinkContainer to='/' className='nav-btn'>
                  <Nav.Link>
                    <Image src='http://via.placeholder.com/130x130' roundedCircle />
                  </Nav.Link>
                </LinkContainer>
              </div>
            </Col>
            <Col xs={12} md={0} className='justify-content-center text-center d-md-none'>
              <div className='d-flex justify-content-center'>
                <div className='footer-section-divider' />
              </div>
            </Col>
            <Col xs={12} md={4} className='justify-content-center text-center my-2 my-md-0'>
              <h4 className='mt-2 mt-md-0' style={{}}>
                Menú
              </h4>
              <div className='my-3'>
                <LinkContainer to='/courses' className='nav-btn'>
                  <Nav.Link className='footer-link'>Cursos</Nav.Link>
                </LinkContainer>
              </div>
              <div className='my-3'>
                <LinkContainer to='/about' className='nav-btn'>
                  <Nav.Link className='footer-link'>Conócenos</Nav.Link>
                </LinkContainer>
              </div>
              <div className='mt-3 mb-2'>
                {/*TODO: Validar inicio de sesión y cambiar link */}
                <LinkContainer to='/signup' className='nav-btn'>
                  <Nav.Link className='footer-link'>Regístrate</Nav.Link>
                </LinkContainer>
              </div>
            </Col>
            <Col xs={12} md={0} className='justify-content-center text-center d-md-none'>
              <div className='d-flex justify-content-center'>
                <div className='footer-section-divider' />
              </div>
            </Col>
            <Col xs={12} md={4} className='justify-content-center text-center my-2 my-md-0'>
              <h4 className='mt-2 mt-md-0' style={{}}>
                Contacto
              </h4>
            </Col>
          </Row>
          <Row>
            <Col className='justify-content-center text-center'>
              <div className='d-flex justify-content-center'>
                <div className='footer-divider' />
              </div>
              <p className='mt-3 mb-0'>&copy; {new Date().getFullYear()} Copyright: Doctrina EC</p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default Footer;

import React, { Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const SigniedOutLinks = () => {
  return (
    <Fragment>
      <Nav className='mr-auto'>
        <LinkContainer to='/' className='nav-btn'>
          <Nav.Link>
            <Button variant='' block className='text-left bg-btn-web'>
              Inicio
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/about' className='nav-btn'>
          <Nav.Link>
            <Button variant='' block className='text-left bg-btn-web'>
              Conócenos
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/courses' className='nav-btn'>
          <Nav.Link>
            <Button variant='' block className='text-left bg-btn-web'>
              Cursos
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/contact' className='nav-btn'>
          <Nav.Link>
            <Button variant='' block className='text-left bg-btn-web'>
              Contáctanos
            </Button>
          </Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav>
        <div className='my-2 my-md-0'>
          <LinkContainer to='/signin' className='nav-btn'>
            <Nav.Link>
              <Button variant='outline-light' block className='btn-rounded shadow-sm px-3'>
                Ingresar
              </Button>
            </Nav.Link>
          </LinkContainer>
        </div>
        <div className='my-2 my-md-0'>
          <LinkContainer to='/signup' className='nav-btn'>
            <Nav.Link>
              <Button variant='' block className='btn-rounded btn-danger shadow-sm px-3'>
                Registrarme
              </Button>
            </Nav.Link>
          </LinkContainer>
        </div>
      </Nav>
    </Fragment>
  );
};

export default SigniedOutLinks;

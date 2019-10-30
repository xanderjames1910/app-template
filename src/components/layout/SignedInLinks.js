import React, { Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const SigniedInLinks = props => {
  const { userRoleAdmin } = props;
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
        <LinkContainer to='/dashboard' className='nav-btn'>
          <Nav.Link>
            <Button variant='' block className='text-left bg-btn-web'>
              Dashboard
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
              <span className='align-middle'>Cursos</span>
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
        {userRoleAdmin ? (
          <Button variant='' block className='text-left bg-btn-web'>
            <NavDropdown title='Dropdown' alignRight id='collasible-nav-dropdown'>
              <LinkContainer to='/dec-admin'>
                <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/create'>
                <NavDropdown.Item>Nuevo Proyecto</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to='/create-course'>
                <NavDropdown.Item>Nuevo Curso</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Button>
        ) : (
          ''
        )}
        <LinkContainer to='/' className='nav-btn'>
          <Nav.Link className='nav-btn'>
            <Button variant='' block className='text-left bg-btn-web' onClick={props.signOut}>
              Salir
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/profile' className='nav-btn'>
          <Nav.Link>
            <Button variant='light' className='btn-profile shadow-sm'>
              {props.profile.initials}
            </Button>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SigniedInLinks);

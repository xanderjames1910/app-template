import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const MenuBar = props => {
  const { auth, profile, userRoleAdmin } = props;
  const links = auth.uid ? <SignedInLinks profile={profile} userRoleAdmin={userRoleAdmin} /> : <SignedOutLinks />;
  // console.log(userRoleAdmin);
  return (
    <Navbar collapseOnSelect expand='lg' variant='dark' fixed='top' className='bg-navbar-web'>
      <Container>
        <LinkContainer to='/' className='nav-btn'>
          {/* <Navbar.Brand> */}
          <Nav.Link>
            <Button variant='' block className='text-left mb-0 bg-btn-web'>
              <strong>Doctrina EC</strong>
            </Button>
          </Nav.Link>
          {/* </Navbar.Brand> */}
        </LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>{links}</Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(MenuBar);

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';

import { signIn } from '../../store/actions/authActions';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ingresar un email válido.')
    .required('Éste campo es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe contener al menos 6 caracteres.')
    .required('Éste campo es requerido'),
});

const SignIn = ({ auth, signIn, signInAuthError, loading }) => {
  if (auth.uid) return <Redirect to='/' />;

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignInSchema}
      onSubmit={async values => {
        await signIn(values);
      }}>
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Container style={{ marginTop: 85 }} className='mb-3'>
          <Row className='justify-content-center'>
            <Col xs={12} md={4}>
              <Form onSubmit={handleSubmit} noValidate>
                <Card style={{ borderRadius: 15 }} className='shadow-sm'>
                  <Card.Header as='h5' className='text-center bg-web-secondary card-header-rounded'>
                    Inicio de Sesión
                  </Card.Header>
                  <Card.Body>
                    <Form.Group controlId='formGroupEmail'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        name='email'
                        value={values.email}
                        placeholder='Enter email'
                        onChange={handleChange}
                        isInvalid={values.email ? (signInAuthError ? true : touched.email && !!errors.email) : false}
                      />
                      {values.email ? (
                        <Form.Control.Feedback type='invalid'>
                          {touched.email && !!errors.email ? errors.email : signInAuthError}
                        </Form.Control.Feedback>
                      ) : (
                        ''
                      )}
                    </Form.Group>
                    <Form.Group controlId='formGroupPassword'>
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type='password'
                        name='password'
                        value={values.password}
                        placeholder='Ingrese su contraseña'
                        onChange={handleChange}
                        isInvalid={
                          values.password ? (signInAuthError ? true : touched.password && !!errors.password) : false
                        }
                      />
                      {values.email ? (
                        <Form.Control.Feedback type='invalid'>
                          {touched.password && !!errors.password ? errors.password : signInAuthError}
                        </Form.Control.Feedback>
                      ) : (
                        ''
                      )}
                    </Form.Group>
                    <p className='mb-0'>
                      Aún no tienes una cuenta? Regístrate{' '}
                      <LinkContainer to='/signup'>
                        <Alert.Link className='link-primary-text'>aquí</Alert.Link>
                      </LinkContainer>
                    </p>
                    {/* {signInAuthError ? (
                      <div className='alert alert-danger mt-3 mb-0' role='alert'>
                        {signInAuthError}
                      </div>
                    ) : null} */}
                  </Card.Body>
                  <Card.Footer className='card-footer-rounded'>
                    <Button
                      variant={loading ? 'secondary' : ''}
                      disabled={loading}
                      type='submit'
                      block
                      className={loading ? '' : 'shadow-sm card-primary-button'}>
                      {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                    </Button>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    signInAuthError: state.auth.signInAuthError,
    auth: state.firebase.auth,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';

import { signUp } from '../../store/actions/authActions';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Éste campo es requerido'),
  lastName: Yup.string().required('Éste campo es requerido'),
  email: Yup.string()
    .email('Debe ingresar un email válido.')
    .required('Éste campo es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe contener al menos 6 caracteres.')
    .required('Éste campo es requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden.')
    .required('Éste campo es requerido.'),
});

const SignUp = ({ auth, signUp, signUpAuthError, loading }) => {
  if (auth.uid) return <Redirect to='/' />;

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={async values => {
        await signUp(values);
      }}>
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Container style={{ marginTop: 85 }} className='mb-3'>
          <Row className='justify-content-center'>
            <Col xs={12} md={4}>
              <Form onSubmit={handleSubmit} noValidate>
                <Card style={{ borderRadius: 15 }} className='shadow-sm'>
                  <Card.Header as='h5' className='text-center bg-web-secondary card-header-rounded'>
                    Resgistro
                  </Card.Header>
                  <Card.Body>
                    <Form.Group controlId='formGroupFirstName'>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        required
                        type='text'
                        name='firstName'
                        value={values.firstName}
                        placeholder='Digite su Nombre'
                        onChange={handleChange}
                        isInvalid={touched.firstName && !!errors.firstName}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {touched.firstName && errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='formGroupLastName'>
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        required
                        type='text'
                        name='lastName'
                        value={values.lastName}
                        placeholder='Digite su Apellido'
                        onChange={handleChange}
                        isInvalid={touched.lastName && !!errors.lastName}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {touched.lastName && errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='formGroupEmail'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type='email'
                        name='email'
                        value={values.email}
                        placeholder='Digite su email'
                        onChange={handleChange}
                        isInvalid={values.email ? (signUpAuthError ? true : touched.email && !!errors.email) : false}
                      />
                      {values.email ? (
                        <Form.Control.Feedback type='invalid'>
                          {touched.email && !!errors.email ? errors.email : signUpAuthError}
                        </Form.Control.Feedback>
                      ) : (
                        ''
                      )}
                    </Form.Group>
                    <Form.Group controlId='formGroupPassword'>
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        required
                        type='password'
                        name='password'
                        value={values.password}
                        placeholder='Ingrese su contraseña'
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {touched.password && errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='formGroupPasswordConfirmation'>
                      <Form.Label>Confirme su Contraseña</Form.Label>
                      <Form.Control
                        required
                        type='password'
                        name='confirmPassword'
                        value={values.confirmPassword}
                        placeholder='Confirme su contraseña'
                        onChange={handleChange}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {touched.confirmPassword && errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p className='mb-0'>
                      Ya tienes una cuenta? Ingresa{' '}
                      <LinkContainer to='/signin'>
                        <Alert.Link className='link-primary-text'>aquí</Alert.Link>
                      </LinkContainer>
                    </p>
                    {/* {signUpAuthError ? (
                      <div className='alert alert-danger mt-3 mb-0' role='alert'>
                        {signUpAuthError}
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
                      {loading ? 'Registrando datos' : 'Registrarme'}
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
    signUpAuthError: state.auth.signUpAuthError,
    auth: state.firebase.auth,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

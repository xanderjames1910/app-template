const initState = {
  signUpAuthError: null,
  signInAuthError: null,
  loading: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'AUTH_START':
      console.log(state);
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        signInAuthError: 'El usuario o contraseña ingresados no son válidos.',
        loading: false,
      };
    case 'LOGIN_SUCCESS':
      console.log('Login succes');
      return {
        ...state,
        signInAuthError: null,
        loading: false,
      };
    case 'SIGNOUT_SUCCESS':
      console.log('Cierre de sesión correcto');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('Registro exitoso');
      return {
        ...state,
        signUpAuthError: null,
        loading: false,
      };
    case 'SIGNUP_ERROR':
      if (action.err.code === 'auth/email-already-in-use') {
        return {
          ...state,
          signUpAuthError: 'Ya existe un usuario registrado con éste email.',
          loading: false,
        };
      }
      break;
    default:
      return state;
  }
};

export default authReducer;

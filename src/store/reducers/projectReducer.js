const initState = {
  projects: [],
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('Proyecto creado', action.project);
      return state;
    case 'CREATE_PROJECT_ERROR_':
      console.log('create project error', action.err);
      return state;
    default:
      return state;
  }
};

export default projectReducer;

import React, { Component, Fragment } from 'react';

class HomeLayout extends Component {
  render() {
    return (
      <div onLoad={window.scrollTo(0, 0)}>
        <Fragment>
          <div>Página de Inicio</div>
        </Fragment>
      </div>
    );
  }
}

export default HomeLayout;

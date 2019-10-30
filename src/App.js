import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTopRoute from './ScrollToTopRoute';
import './App.css';

import MenuBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

import HomeLayout from './components/website/home/HomeLayout';

// import Admin from './components/website/administrative/DecAdmin';

import firebase from './config/fbConfig';

class App extends Component {
  state = {
    userRoleAdmin: {},
  };

  userRoleSetup = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        this.setState({ userRoleAdmin: user.admin });
      });
    }
  });

  render() {
    const { userRoleAdmin } = this.state;

    return (
      <Router>
        <div className='App'>
          <MenuBar userRoleAdmin={userRoleAdmin} />
          <Switch>
            {/* <Route path='/admin' render={props => <Admin {...props} userRoleAdmin={userRoleAdmin} />} /> */}
            <ScrollToTopRoute path='/dashboard' component={Dashboard} />

            <ScrollToTopRoute exact path='/' component={HomeLayout} />
            <ScrollToTopRoute path='/signin' component={SignIn} />
            <ScrollToTopRoute path='/signup' component={SignUp} />
          </Switch>
          <Footer />
        </div>
        <div>Plantilla Web App</div>
      </Router>
    );
  }
}

export default App;

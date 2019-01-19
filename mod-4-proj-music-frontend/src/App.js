import React, { Component } from 'react';
import './App.css';
import FullContainer from './containers/FullContainer';
import Sidebar from './components/Sidebar';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import NewUserForm from './components/NewUserForm';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Switch>
          <Route
            path="/signup"
            component={NewUserForm} />
          <Route
            path="/login"
            component={Login} />
          <Route
            path="/"
            render={()=> <h1>Home</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;

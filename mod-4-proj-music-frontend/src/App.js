import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import FullContainer from './containers/FullContainer';
import Sidebar from './components/Sidebar';
import NewUserForm from './components/NewUserForm';
import Login from './components/Login';
import PopTrack from './components/PopTrack'
import RandomTrack from './components/RandomTrack'


class App extends Component {
  _isMounted = false;

  state={
    topHits: [],
    userList: [],
    random: [],
    isLoading: true
  }

  componentDidMount(){
    this._isMounted = true;
    this.getUserList()
    this.getTopHits()
    this.getRandom()
    if (this._isMounted) {
      this.setState({isLoading: false})
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  getTopHits(){
    //change address depending on port
    fetch('http://localhost:3001/api/v1/tracks/top_100')
      .then(res=>res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            topHits: data
          })
        }
      })
  }

  getRandom(){
    //change address depending on port
    fetch('http://localhost:3001/api/v1/tracks/random')
      .then(res=>res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            random: data
          })
        }
        })
  }

  getUserList(){
    fetch('http://localhost:3001/api/v1/users')
      .then(res=>res.json())
      .then(data=> {
        this.setState({
          userList: data
        })
      })
  }

  render() {

    return (
      <div className="App">
      <Sidebar />
      <Switch>

        <Route
          path="/popular"
          render={()=> (
            this.state.topHits.length === 0?
            <h1> Loading... </h1> :
            <PopTrack
              topHits={this.state.topHits}
              />
            )}
            />

        <Route
          path="/random"
          render={()=> (
            this.state.random.length === 0?
              <h1>Loading...</h1> :
              <RandomTrack
                random={this.state.random}
                />
            )}
            />

        <Route
          path="/signup"
          render={()=>(
            <NewUserForm />
          )}
        />

        <Route
          path="/login"
          render={()=> (
            <Login
              users={this.state.userList}
              />
            )}
            />

        <Route
          path="/"
          render={()=> <h1>Home</h1>} />

      </Switch>
      </div>
    );
  }
}

export default App;

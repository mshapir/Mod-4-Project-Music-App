import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import FullContainer from './containers/FullContainer';
import Sidebar from './components/Sidebar';
import NewUserForm from './components/NewUserForm';
import Login from './components/Login';
import PopTrack from './components/PopTrack';
import RandomTrack from './components/RandomTrack';
import Playlist from './components/Playlist';
import UserProfile from './components/UserProfile';
import Home from './components/Home';



class App extends Component {
  _isMounted = false;

  state={
    topHits: [],
    userList: [],
    random: [],
    isLoading: true,
    user: {},
    login: false
  }

  componentDidMount(){
    this._isMounted = true;
    this.getUserList()
    this.getTopHits()
    this.getRandom()
    if (this._isMounted) {
      this.setState({isLoading: false})
    }
    if (localStorage.length > 0){
      let token = localStorage.getItem("token")
      fetch('http://localhost:3001/api/v1/current_users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Action: "application/json",
          Authorization: `${token}`
        }
      })
    }
    if(localStorage.getItem("token") !== null) {
      this.setState({
        user: {
          id: localStorage.getItem("id"),
          username: localStorage.getItem("username"),
          name: localStorage.getItem("name")
        }
      })
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

  loginSubmitHandler = (userInfo) => {
    fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Action: "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    }).then(res=>res.json())
      .then(data => {
        console.log(data)
        this.setState({
          user: data.user,
          login: true
        })
        this.props.history.push("/profile")
      })
  }


    newUserSubmitHandler = (event, userInfo) => {
      event.preventDefault()
      let token = localStorage.getItem("token")
      fetch('http://localhost:3001/api/v1/users', {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         Authorization: `${token}`
       },
       body: JSON.stringify({
         name: userInfo.name,
         username: userInfo.username,
         password: userInfo.password
       })
     }).then(res=>res.json())
        .then(data=>{
          console.log(data);
          localStorage.setItem("token", data.jwt)
          this.setState({
            user: data.user
          })
          this.props.history.push("/profile")
        })

    }

    logout = () => {
      localStorage.removeItem("token")
      this.setState({
        user: {},
        login: false
      })
      this.props.history.push("/home")
    }

  render() {

    return (
      <div className="App">
<<<<<<< HEAD
      <Sidebar
        login={this.state.login}
        logout={this.logout}
        />
      <Switch>

      <Route
        path="/playlist"
        render={()=> (
          <Playlist userInfo={this.state.user}/>
        )} />

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
          path="/profile"
          render={()=>(
            <UserProfile userInfo={this.state.user} />
          )}
          />

        <Route
          path="/signup"
          render={()=>(
            <NewUserForm
              newUserSubmitHandler={this.newUserSubmitHandler}
              />
          )}
        />

        <Route
          path="/login"
          render={()=> (
            <Login
              loginSubmitHandler={this.loginSubmitHandler}
              userInfo={this.state.user}
              />
            )}
            />

        <Route
          path="/home"
          render={()=> (
            <Home />
          )}
          />

        <Route
          path="/"
          render={()=> (
            <Home />
          )}
          />

      </Switch>
=======
        <Sidebar />
        <Switch>
        <Route
        path="/popular"
        component={FullContainer}/>
          <Route
            path="/signup"
            component={NewUserForm} />
          <Route
            path="/login"
            component={Login} />
          <Route
            path="/"
            render={()=> <h1>home</h1>} />
        </Switch>
>>>>>>> Manny-Shapir
      </div>
    );
  }
}

export default withRouter(App);

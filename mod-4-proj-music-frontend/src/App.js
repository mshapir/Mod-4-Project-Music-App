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
import Loading from './components/Loading'



class App extends Component {
  _isMounted = false;

  state={
    topHits: [],
    userList: [],
    random: [],
    isLoading: true,
    user: {},
    login: false,
    playlist: [],
    searchedSongs: [],
    loading: false
  }

  componentDidMount(){
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({isLoading: false})
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getTopHits(){
    //change address depending on port
    fetch('http://localhost:3001/api/v1/tracks/top_100', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res=>res.json())
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
    fetch('http://localhost:3001/api/v1/tracks/random', {
      headers: {
        Authorization: localStorage.getItem("token")}
      })
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
        localStorage.setItem("token", data.jwt)
        this.setState({
          user: data.user,
          login: true
        })
        this.props.history.push("/home")
        this.getRandom()
        this.getTopHits()
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
         password: userInfo.password,
       })
     }).then(res=>res.json())
        .then(data=>{
          localStorage.setItem("token", data.jwt)
          this.setState({
            user: data.user,
            login: true
          })
          this.props.history.push("/home")
          this.getRandom()
          this.getTopHits()
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



    submitPlaylistHandler= (e, playlistState) => {
      e.preventDefault()
      fetch('http://localhost:3001/api/v1/playlists', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          name: playlistState.name,
          user_id: playlistState.userId,
          spotify_id: "10M2Ex445zw585Ducldzkw"
        })
      }).then(res=>res.json())
        .then(data=>{
          let fullPlaylist = [...this.state.playlist, data]
          this.setState({
            playlist: fullPlaylist
          })
        })
    }


    editSubmitHandler = (e, userInfo) => {
      e.preventDefault()
      let id = this.state.user.id
      console.log(id);
      fetch(`http://localhost:3001/api/v1/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          name: userInfo.name,
          username: userInfo.username,
          password: this.state.user.password
        })
      })
    }

    deleteUser = () => {
      let id = this.state.user.id
        fetch(`http://localhost:3001/api/v1/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(this.logout())
    }

    fetchSearchedSongs = (query) => {
      this.setState({loading: true})
      fetch(`http://localhost:3001/api/v1/tracks/search?q=${query}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(r => r.json())
      .then(data => {
        this.setState({
          searchedSongs: data,
          loading: false
        })
      })
    }

    addToPlaylist = (track) => {
      let newPlaylist = [...this.state.playlist, track]
      this.setState({
        playlist: newPlaylist
      })
      alert(`${track.name} added!`)
    }

    removeSong = (trackObj) => {
      let newPlaylist = [...this.state.playlist].filter(track => track !== trackObj)
      this.setState({playlist: newPlaylist})
    }
    // fetchTracks = () => {
    //   fetch('http://localhost:3001/api/v1/tracks')
    // }


  render() {

    return (
      <div className="App">
      <Sidebar
        login={this.state.login}
        logout={this.logout}
        />
      <Switch>

      <Route
        path="/playlist"
        render={()=> (
          <Playlist
            userInfo={this.state.user}
            submitPlaylistHandler={this.submitPlaylistHandler}
            playlist={this.state.playlist}
            removeSong={this.removeSong}
          />
        )} />

        <Route
          path="/popular"
          render={()=> (
            this.state.topHits.length === 0?
            <Loading /> :
            <PopTrack
              topHits={this.state.topHits}
              addToPlaylist={this.addToPlaylist}
              />
            )}
            />

        <Route
          path="/random"
          render={()=> (
            this.state.random.length === 0?
              <Loading /> :
              <RandomTrack
                random={this.state.random}
                addToPlaylist={this.addToPlaylist}
                />
            )}
            />

        <Route
          path="/profile"
          render={()=>(
            <UserProfile
              userInfo={this.state.user}
              editSubmitHandler={this.editSubmitHandler}
              deleteUser={this.deleteUser}
             />
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
            <Home
              fetchSearchedSongs={this.fetchSearchedSongs}
              searchedSongs={this.state.searchedSongs}
              login={this.state.login}
              loading={this.state.loading}
              addToPlaylist={this.addToPlaylist}
            />
          )}
          />

        <Route
          path="/"
          component={Home}
          />

      </Switch>
      </div>
    );
  }
}

export default withRouter(App);

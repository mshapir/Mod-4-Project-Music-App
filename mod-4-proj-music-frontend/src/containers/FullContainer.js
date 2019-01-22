import React from 'react';
<<<<<<< HEAD


class FullContainer extends React.Component {

=======
import User from '../components/User';
import Popular from '../components/Popular'
import Search from '../components/Search'
import Loading from '../components/Loading'

class FullContainer extends React.Component {

  state={
    topHits: [],
    userList: [],
    searched: []
  }

  componentDidMount(){
    this.getTopHits()
    this.getUserList()
  }

  getTopHits = () => {
    // change address depending on port
    fetch('http://localhost:3000/api/v1/tracks/top_100')
      .then(res=>res.json())
      .then(data => {
        this.setState({
          topHits: data
        })
      })
  }

  getUserList = () => {
    fetch('http://localhost:3000/api/v1/users')
      .then(res=>res.json())
      .then(data=> {
        this.setState({
          userList: data
        })
      })
  }


  newUserSubmitHandler = (user) => {
    console.log(user);
    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: user.name,
        username: user.username,
        password: user.password
      })
    })
  }

  fetchSearchedSongs = (query = 'thank you') => {
		fetch(`http://localhost:3000/api/v1/tracks/search?q=${query}`)
		.then(r => r.json())
		.then(data => {
			this.setState({
				topHits: data
			})
		})
	}


>>>>>>> Manny-Shapir
  render() {
    console.log(this.state.topHits);
    return this.state.topHits.length > 0  ?
    (<div><Search fetchSongs={this.fetchSearchedSongs}/>
    <Popular topHits={this.state.topHits}/></div>)
    :
    (
      <div>
<<<<<<< HEAD
=======
        <Loading />

>>>>>>> Manny-Shapir
      </div>
    )
  }
}
export default FullContainer;

// <User
//   users={this.state.userList}
//   newUserSubmitHandler={this.newUserSubmitHandler}
//   />

import React from 'react';
import User from '../components/User';
import Track from '../components/Track'

class FullContainer extends React.Component {

  state={
    topHits: [],
    userList: []
  }

  componentDidMount(){
    this.getTopHits()
    this.getUserList()
  }

  getTopHits(){
    //change address depending on port
    // fetch('http://localhost:3001/api/v1/tracks/top_100')
    //   .then(res=>res.json())
    //   .then(data => {
    //     this.setState({
    //       topHits: data
    //     })
    //   })
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


  newUserSubmitHandler = (state) => {
    fetch('http://localhost:3001/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: state.name,
        username: state.username,
        password: state.password
      })
    })
  }


  render() {
    return(
      <div>
        <h1>FullContainer</h1>
        <User
          users={this.state.userList}
          newUserSubmitHandler={this.newUserSubmitHandler}
          />
      </div>
    )
  }
}
export default FullContainer;

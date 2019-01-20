import React from 'react';
import User from '../components/User';
import Track from '../components/Track';


class FullContainer extends React.Component {

  state={
    topHits: [],
    userList: []
  }

  componentDidMount(){
    this.getUserList()
    this.getTopHits()
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


  render() {
    return(
      <div>
        <h1>FullContainer</h1>
          <User
            users={this.state.userList}
            />
      </div>
    )
  }
}
export default FullContainer;

import React from 'react';

class UserProfile extends React.Component {
  render() {
    console.log(this.props)
    return(
      <div>
        <h1>Welcome Back {this.props.userInfo.name}</h1>

      </div>
    )
  }
}
export default UserProfile;

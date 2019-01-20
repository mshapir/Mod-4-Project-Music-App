import React from 'react';

class Login extends React.Component {

  state={
    user: {},
    username: "",
    password: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    let token = localStorage.getItem("token")
    fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Action: "application/json",
        Authorization: `${token}`
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res=>res.json())
      .then(data => {
        localStorage.setItem("token", data.jwt)
        console.log(data)
        // this.setState({
        //   user: data.user,
        //   username: "",
        //   password: ""
        // })
      })
  }


  render() {
    return(
      <form className="new-user-form" onSubmit={this.submitHandler}>

        <h2>Login:</h2>
        <div className="form-group">
          <label>Username</label>
          <input type="username" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.changeHandler} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}
export default Login;

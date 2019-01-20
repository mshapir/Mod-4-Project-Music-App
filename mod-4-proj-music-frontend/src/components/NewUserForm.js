import React from 'react';

class NewUserForm extends React.Component {

  state={
    name: "",
    username: "",
    password: "",
    user: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
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
  }

  submitHandler = (event) => {
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
       name: this.state.name,
       username: this.state.username,
       password_digest: this.state.password
     })
   }).then(res=>res.json())
      .then(data=>{
        localStorage.setItem("token", data.jwt)
        this.setState({
          name: "",
          username: "",
          password: "",
          user: data.user
        })
      })
  }


  render() {

    return(
      <form className="new-user-form" onSubmit={this.submitHandler}>
        <h2>Make a New User:</h2>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={this.changeHandler} />
        </div>
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
export default NewUserForm;

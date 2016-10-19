import React from 'react';
import requests from './request.js'

var request = requests.request
var formRequest = requests.formRequest

class Login extends React.Component {
  logIn(){
    formRequest('/login', "POST", {
                                username: this.state.username,
                                password: this.state.password
                                }, 
                               response => this.props.setLogin(response.loggedIn))
  }

  

  render() {
    return (

      <div>
        <h3>Log In:</h3>
        <input type="text" placeholder="Enter username" onChange={(e)=>this.setState({username:e.target.value})} />
        <input type="password" placeholder="Enter password" onChange={(e)=>this.setState({password:e.target.value})} />
        <button onClick={this.logIn.bind(this)}>Submit</button>

      </div>
      )
  }
}

module.exports = Login
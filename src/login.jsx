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

  logOut(){
    request('/logout', "GET", null, response => this.setState({loggedIn: response.loggedIn}))
  }

  render() {

        return  (<div>
                    <input type="text" onChange={e => this.setState({username: e.target.value})}/>
                    <input type="password" onChange={e => this.setState({password: e.target.value})}/>
                    <button type="submit" onClick={this.logIn.bind(this)}>Login</button>
                </div>)
  }
}

module.exports = Login
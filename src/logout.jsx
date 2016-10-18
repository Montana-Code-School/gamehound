import React from 'react';
import requests from './request.js'

var request = requests.request


class Logout extends React.Component {

  logOut(){
    request('/logout', "GET", null, response => this.props.setLogin(response.loggedIn))
  }

  render() {
        return  (<button onClick={this.logOut.bind(this)}>Log Out</button>)
  }
}

module.exports = Logout
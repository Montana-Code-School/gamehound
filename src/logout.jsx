import React from 'react';
import requests from './request.js'
import {browserHistory} from 'react-router'
var request = requests.request


class Logout extends React.Component {

  logOut(){
    request('/logout', "GET", null, response => {
    	this.props.setLogin(response)

        browserHistory.push('/')
    })
  }

  render() {
        return  (<div className="container"> <button className="btn btn-warning" onClick={this.logOut.bind(this)}>Log Out</button></div>)
  }
}

module.exports = Logout
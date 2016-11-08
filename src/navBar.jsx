import React from 'react';
import requests from './request.js'
import _ from 'lodash'
import {browserHistory} from 'react-router'
import Login from './login.jsx'

var request = requests.request
var formRequest = requests.formRequest

class NavBar extends React.Component {

  render() {

      return(
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <a href="/">
                <img src="/imgs/bassetgif.gif" id="dog" className="col-lg-4 col-md-4 col-sm-4 col-xs-4"/>
              </a>
              <div className="col-lg-4 col-sm-4 col-xs-4 rainbow">
                <a href="/">
                  <h1>
                    {"Gamehound".split("").map(letter=> <span className="rainbow">{letter}</span> )}
                  </h1>
                </a>
                </div>            
              </div>
            <Login setLogin={this.props.setLogin} loggedIn={this.props.loggedIn}/>
          </div>
        </nav>
        )
      }

    }

module.exports = NavBar
import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import _ from 'lodash'
import {browserHistory} from 'react-router'

var request = requests.request
var formRequest = requests.formRequest

class Login extends React.Component {

  logIn(){
    if(_.get(this, 'state.username') && _.get(this, 'state.password')) {
      formRequest('/login', "POST", {
                                  username: this.state.username,
                                  password: this.state.password
                                  }, 
                                 response => {
                                  // this.setError(response.flash);
                                    this.props.setLogin(response);
                                    if(response.loggedIn && response.user.username === "admin"){
                                      browserHistory.push('/adminPanel')
                                    }
                                  })
    } else {
      this.setState({showError:true})
    }
  }

  logOut(){
    request('/logout', "GET", null, response => {
      this.props.setLogin(response)

    })
  }

  // add(event){
  //        if(event.charCode === 13){
  //           this.logIn();
  //        }
  //    }

  // setError(value){
  //   this.setState({error:value})
  // }

  // noUsernameOrPassword(){
  //     if(_.get(this,'state.showError')){
  //       if(!this.state.username){
  //         return <div className="alert alert-danger">Please enter a username.</div>

  //       } 
  //       if (!this.state.password){
  //         return <div className="alert alert-danger">Please enter a password.</div>
  //       }
  //     }
  //   }

  // //Need to differentiate the various errors
  // wrongPassword(){
  //   if(_.get(this, 'state.error')){ //using lodash here to null check 
  //     return <div className="alert alert-danger">Incorrect password.</div>
  //   }

  // }

  render() {
    console.log("props ", this.props.loggedIn)
    if(!this.props.loggedIn){
      return (      
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><span className="navbar-text">
                Admin Login:
              </span></li>
              <li form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                    <input type="text" className="form-control" name="username" placeholder="Username" onChange={(e)=>this.setState({username:e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e)=>this.setState({password:e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-default" onClick={this.logIn.bind(this)}>Login</button>
              </li> 
            </ul>
          </div> )
    } else {
      return (
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              
              <li form className="navbar-form navbar-right" role="search">
                <button type="submit" className="btn btn-default" onClick={this.logOut.bind(this)}>Logout</button>
              </li> 
              
            </ul>
          </div>
      )
    }
  }
}
module.exports = Login


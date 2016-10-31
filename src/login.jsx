import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import _ from 'lodash'

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
                                  console.log(response.flash)
                                  this.setError(response.flash);
                                  this.props.setLogin(response);

                                  })
    } else {
      this.setState({showError:true})
    }
  }

  add(event){
         if(event.charCode === 13){
            this.logIn();
         }
     }

  setError(value){
    this.setState({error:value})
  }

  noUsernameOrPassword(){
      if(_.get(this,'state.showError')){
        if(!this.state.username){
          return <div className="alert alert-danger">Please enter a username.</div>

        } 
        if (!this.state.password){
          return <div className="alert alert-danger">Please enter a password.</div>
        }
      }
    }

  //Need to differentiate the various errors
  wrongPassword(){
  if(_.get(this, 'state.error')){ //using lodash here to null check 
    return <div className="alert alert-danger">Incorrect password.</div>
  }

  }

  render() {
    return (

      <div className="container">
        <h3>Log In:</h3>
        {this.noUsernameOrPassword()}
        {this.wrongPassword()}
        <input type="text" placeholder="Enter username" onChange={(e)=>this.setState({username:e.target.value})} onKeyPress={this.add.bind(this)} />
        <input type="password" placeholder="Enter password" onChange={(e)=>this.setState({password:e.target.value})} onKeyPress={this.add.bind(this)} />
        <button className="btn btn-success" onClick={this.logIn.bind(this)}>Submit</button>
      </div>
      )
  }
}
module.exports = Login


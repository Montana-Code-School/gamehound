// needs work still for toggling pushy flash messages with user entering/not entering username and passwords in fields
// AKA handling the state when showError stays "true" and thus error messages if statements are always going and don't turn off

import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import _ from 'lodash'

var request = requests.request
var formRequest = requests.formRequest

class SignUp extends React.Component{

	signUp(){
		if(_.get(this, 'state.username') && _.get(this, 'state.password')){
			formRequest('/signup', 'POST', {
										username: this.state.username,
										password: this.state.password	
										},
										response => {
											console.log(response.flash)
											this.setError(response.flash);
											this.props.setLogin(response.loggedIn);								
										})

		} else { 
			   this.setState({showError:true})

		}
		
	}

	add(event){
         if(event.charCode === 13){
            this.signUp();
         }
     }

    setError(value){
    	this.setState({error:value})
    }

    noUsernameOrPassword(){
    	console.log("in no username or password")
    	if(_.get(this,'state.showError')){
	    	if(!this.state.username){
	    		return <div className="alert alert-danger">Please enter a username.</div>

	    	} 
	    	if (!this.state.password){
	    		return <div className="alert alert-danger">Please enter a password.</div>
	    	}
    	}
    }

	inUse(){
		if(_.get(this, 'state.error')){ //using lodash here to null check 
			return <div className="alert alert-danger">That username is already in use.</div>
		}

	}

	render() {
		return (

			<div>
				<h3>Sign Up:</h3>
				{this.noUsernameOrPassword()}
				{this.inUse()}
				<input type="text" placeholder="Enter username" onChange={(e)=>this.setState({username:e.target.value})} onKeyPress={this.add.bind(this)} />
				<input type="password" placeholder="Enter password" onChange={(e)=>this.setState({password:e.target.value})} onKeyPress={this.add.bind(this)} />
				<button onClick={this.signUp.bind(this)}>Submit</button>

			</div>


			)
	}


}

module.exports = SignUp
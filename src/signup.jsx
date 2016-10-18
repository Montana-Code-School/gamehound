import React from 'react';
import requests from './request.js'

var request = requests.request
var formRequest = requests.formRequest

class SignUp extends React.Component{
	signUp(){
		formRequest('/signup', 'POST', {
										username: this.state.username,
										password: this.state.password	
										},

					)
	}


}

module.exports = SignUp
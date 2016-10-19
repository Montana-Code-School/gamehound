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
										response => {
											console.log('FLASH MESSAGE', response.flash)
											this.props.setLogin(response.loggedIn)										
										})
	}

	setLogin(value){
    	this.setState({loggedIn: value})
    }

	// checkInfo(){
	// 	if(this.state.username === ''){
	// 		this.setState({error : "Username is blank!"})
	// 	} else if (this.state.password === ''){
	// 		this.setState({error : "Password is blank!"})
	// 	} else {
	// 		console.log("we checked all the info")
	// 	}
	// }

	render() {
		return (

			<div>
				<h3>Sign Up:</h3>
				<input type="text" placeholder="Enter username" onChange={(e)=>this.setState({username:e.target.value})} />
				<input type="password" placeholder="Enter password" onChange={(e)=>this.setState({password:e.target.value})} />
				<button onClick={this.signUp.bind(this)}>Submit</button>

			</div>


			)
	}

}

module.exports = SignUp
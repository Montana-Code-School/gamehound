import React from 'react';
import keydown from 'react-keydown';
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


  add(event){
         if(event.charCode === 13){
            this.logIn();
         }
     }



  render() {
    return (

      <div>
        <h3>Log In:</h3>
        <input type="text" placeholder="Enter username" onChange={(e)=>this.setState({username:e.target.value})} onKeyPress={this.add.bind(this)} />
        
        <input type="password" placeholder="Enter password" onChange={(e)=>this.setState({password:e.target.value})} onKeyPress={this.add.bind(this)} />
        <button onClick={this.logIn.bind(this)}>Submit</button>

      </div>
      )
  }
}

module.exports = Login


// class MyComponent extends React.Component {
 
//   @keydown( 'enter' ) // or specify `which` code directly, in this case 13 
//   submit( event ) {
//     // do something, or not, with the keydown event, maybe event.preventDefault() 
//     MyApi.post( this.state );
//   }
// }


    // @keydown('enter')
    // submit( event ) {
    //   this.logIn.bind(this)
    // }
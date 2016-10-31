import React from 'react';
import ReactDOM from 'react-dom';
import FunAdvisorApp from './funAdvisorApp.jsx' 

class OnceEveryFiveSeconds extends React.Component {
  
  constructor(){
    super()
    this.state = {
      disabled: false
    }
  }
  
  disableButton() {
    this.setState({disabled: true})
    console.log("Hi")
    setTimeout(() => this.setState({disabled: false})
    , 5000)
  }
  
  
  render() {
		return 
      (<div>
				<button onClick={this.disableButton.bind(this)} disabled={this.state.disabled}>Something different from the other buttons</button>
			</div>)
	}
}


module.exports = OnceEveryFiveSeconds;
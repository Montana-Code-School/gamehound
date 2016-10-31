// Need make it so that if a button is clicked multiple times, it is turned on or off
// Make things look badass. (Greater color change when toggeled)

import React from 'react';
import requests from './request.js'
import _ from 'lodash'
import ToggleList from './toggleList'

var request = requests.request

class GameFilter extends React.Component {
        		//number of players, type, amount of time, difficulty

	constructor(props) {
	  super(props);
	  this.state = {type: new ToggleList()}
	  // Operations usually carried out in componentWillMount go here
	}

	stateToggler(newType){
		this.setState({type: this.state.type.toggle(newType)})
	}

	getGame(){
    
      request('/api/game/recommend', "POST", {
                                  difficulty: this.state.difficulty,
                                  }, 
                                 response => {
                                  console.log(response)
                                  // this.setError(response.flash);
                                  // this.props.setLogin(response.loggedIn);

                                  })
    
  }


	render() {
		var btn = "btn btn-primary";
        return  (<div className="container">
        			<h2>How many people are playing?</h2>
        			<div className="btn-group" data-toggle="buttons">
        			{[['1', 1] ,['2', 2], ['3', 3], ['4',4], ['5-7', 5], ['8+', 8]].map(numOfPlayers =>{
	        		      var gameLabel = numOfPlayers[0];
	        		      var num = numOfPlayers[1]
	        		      return (<label className={btn} key={num} onClick={()=>this.setState({numPlayers:num})}>
						    <input type="radio" autoComplete="off"/>{gameLabel}
						  </label>)
					})}
				 	</div>

					<h2>What type(s) of game would you like to play?</h2>

					<div className="btn-group" data-toggle="buttons">
					{["Icebreaker", 
					  'Card', 
					  'Dice', 
					  "Movement/Improv", 
					  "Party/Group", 
					  "Drinking", 
					  "Roadtrip", 
					  "Thought Provoking/Discussion"].map(gameType =>
					  (<label className={btn} key={gameType} onClick={(e) =>this.stateToggler(gameType)}>
			    		<input type="checkbox"  autoComplete="off"/> {gameType}
					  </label>))
				    }
		
					</div>

					<h2>How long would you like the game to be?</h2>
					
					<div className="btn-group" data-toggle="buttons">
	        			{[['5-10 minutes', 5] ,['15 minutes', 15], ['30 minutes', 30], ['1 hour', 60], ['>1 hour', 61]].map(time =>{
		        		      var gameLabel = time[0];
		        		      var num = time[1]
		        		      return (<label className={btn} key={num} onClick={()=>this.setState({time:num})}>
							    <input type="radio" autoComplete="off"/>{gameLabel}
							  </label>)
						})}
				 	</div>


                	<h2>How difficult of a game do you want to play?</h2>

                	<div className="btn-group" data-toggle="buttons">
	        			{['Easy', 'Medium', 'Hard'].map(levelOfDifficulty =>{
		        	
		        		      return (<label className={btn} key={levelOfDifficulty} onClick={()=>this.setState({difficulty:levelOfDifficulty})}>
							    <input type="radio" autoComplete="off"/>{levelOfDifficulty}
							  </label>)
						})}
				 	</div>

				 	<div>
				 		<button className="btn btn-success" onClick={this.getGame.bind(this)}>Fetch Me A Game!</button>
				 	</div>


                </div>)
  }


}


module.exports = GameFilter
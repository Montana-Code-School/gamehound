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
	  this.state = {type: new ToggleList(),
	  				renderedGames: null }
	  // Operations usually carried out in componentWillMount go here
	}

	stateToggler(newType){
		this.setState({type: this.state.type.toggle(newType)})
	}

	getGame(){
    
      request('/api/game/recommend', "POST", {
                                  difficulty: this.state.difficulty,
                                  type: this.state.type,
                                  numPlayers: this.state.numPlayers,
                                  time: this.state.time

                                  }, 
                                 response => {

                                  this.setState({renderedGames:response})

                                  })
    
  	}

  	dontShowEmpty(prop){ //Can maybe use to generalize if needed? 
  		if(prop.length !== 0){
  			return (<li className="list-group-item"><h3>Items Needed:</h3> <h4>{prop}</h4></li>)
  		}
  	}


	render() {
		var btn = "btn btn-primary";
        	if(this.state.renderedGames){
        		return (
        			<div>
        			<ul className="list-group">
        				{this.state.renderedGames.map(game => (<div><li className="list-group-item"><h3>Name:</h3> <h4>{game.gameName}</h4></li>
        													   		<li className="list-group-item"><h3>Percent Match:</h3> <h4>{game.totalScore}%</h4></li>
        													   	    <li className="list-group-item"><h3>Description:</h3> <h4>{game.description}</h4></li>
        													   	    {this.dontShowEmpty(game.itemsNeeded.join(", "))}
        													   	    <li className="list-group-item"><h3>Type:</h3> <h4>{game.type.join(", ")}</h4></li>
        													   </div>))}
        			</ul>
        			</div>)
        	} else {
        		return (<div className="container">
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

}


module.exports = GameFilter
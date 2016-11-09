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
	  				renderedGames: null
	  				 }
	  // Operations usually carried out in componentWillMount go here
	}

	stateToggler(newType){
		this.setState({type: this.state.type.toggle(newType)})
	}

  	fetchButtonClicked(){
  		const {difficulty, type, numPlayers, time} = this.state
  		this.props.getGame(difficulty, type, numPlayers, time)
  	}

	render() {
        	var btn = "btn btn-primary btn-lg";
	        		return (<div>
			        			
			        			
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

							 	<hr className="style18" />


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

								<hr className="style18" />

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

							 	<hr className="style18" />

			                	<h2>How difficult of a game do you want to play?</h2>

			                	<div className="btn-group" data-toggle="buttons">
				        			{['Easy', 'Medium', 'Hard'].map(levelOfDifficulty =>{
					        	
					        		      return (<label className={btn} key={levelOfDifficulty} onClick={()=>this.setState({difficulty:levelOfDifficulty})}>
										    <input type="radio" autoComplete="off"/>{levelOfDifficulty}
										  </label>)
									})}
							 	</div>


							 	<hr className="style18" />

							 	<div className="row">
								 	<div className="col-md-3 col-lg-3">
								 		<button className="btn btn-success btn-lg" onClick={this.fetchButtonClicked.bind(this)}>Fetch Me A Game!</button>
								 	</div>

								 	<div className="col-md-3 col-lg-3">
									<button type="button" className="btn btn-success btn-lg"  data-toggle="modal" data-target="#myModal">
									  Instructions
									</button>

								</div>
									<div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									  <div className="modal-dialog" role="document">
									    <div className="modal-content">
									      <div className="modal-header">
									        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
									          <span aria-hidden="true">&times;</span>
									        </button>
									        <h4 className="modal-title" id="myModalLabel">How to Use Gamehound</h4>
									      </div>
									      <div className="modal-body">
									        Looking for a game to play? Answer any or all of the four questions on the main page and we will find the best matching game for you. Games are ranked by our search algorithm and served to you in order of relevance.

									      </div>
									      <div className="modal-footer">
									        <button type="button" className="btn btn-primary" data-dismiss="modal">Let's Play!</button>
									      </div>

									  </div>
									</div>
								</div>
			                </div>
			            </div>
			     )		
  		}

}


module.exports = GameFilter
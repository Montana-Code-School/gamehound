import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'

var request = requests.request


class AdminPanel extends React.Component{

	createGame() {
		request('/api/game', 'POST', {
										gameName: this.state.gameName,
										numPlayers: this.state.numPlayers, 
										type: this.state.type,
										time: this.state.time,
										description: this.state.description,
										itemsNeeded: this.state.itemsNeeded,
										tutorial: this.state.tutorial,
										rating: this.state.rating,
										difficulty: this.state.difficulty
										}
						//do we put a callback here? 
										)
	}

	render(){
		var btn = "btn btn-primary";

        return  (<div>
        			<h3>Game Name</h3>
        				<div>
        					<input type="text" onChange={(e)=>this.setState({gameName:e.target.value})}/>
        				</div>


        			<h3>Number of Players</h3>

        			<div className="btn-group" data-toggle="buttons">
	        			{[['1', 1] ,['2', 2], ['3', 3], ['4',4], ['5-7', 5], ['8+', 8]].map(numOfPlayers =>{
		        		      var gameLabel = numOfPlayers[0];
		        		      var num = numOfPlayers[1]
		        		      return (<label className={btn} key={num} onClick={()=>this.setState({numPlayers:num})}>
							    <input type="radio" autoComplete="off"/>{gameLabel}
							  </label>)
						})}
				 	</div>



					<h3>Type</h3>

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

					<h3>Length</h3>
					
					<div className="btn-group" data-toggle="buttons">
	        			{[['5-10 minutes', 5] ,['15 minutes', 15], ['30 minutes', 30], ['1 hour', 60], ['>1 hour', 61]].map(time =>{
		        		      var gameLabel = time[0];
		        		      var num = time[1]
		        		      return (<label className={btn} key={num} onClick={()=>this.setState({time:num})}>
							    <input type="radio" autoComplete="off"/>{gameLabel}
							  </label>)
						})}
				 	</div>

				 	<h3>Description</h3>

				 	<div>
				 		<textarea onChange={(e)=>this.setState({description:e.target.value})}></textarea>
				 	</div>

				 	<h3>Items Needed</h3>

				 	<div>
				 		<input type="text" onChange={(e)=>this.setState({itemsNeeded:e.target.value})} />
				 	</div>

				 	<h3>Tutorial</h3>

				 	<div>
				 	//look up input markdown and figure out how to do this dynamically with react
				 		<div><input type="text" /></div>
				 	</div>

				 	<h3>Rating</h3>
				 		<select onChange={(e)=>this.setState({rating:e.target.value})}>

						  <option value="0" > </option>
						  <option value="5" >5</option>
						  <option value="4">4</option>
						  <option value="3">3</option>
						  <option value="2">2</option>
						  <option value="1">1</option>
						</select>

                	<h3>Difficulty</h3>

                	<div className="btn-group" data-toggle="buttons">
	        			{['Easy', 'Medium', 'Hard'].map(levelOfDifficulty =>{
		        	
		        		      return (<label className={btn} key={levelOfDifficulty} onClick={()=>this.setState({difficulty:levelOfDifficulty})}>
							    <input type="radio" autoComplete="off"/>{levelOfDifficulty}
							  </label>)
						})}
				 	</div>

				 	<div>
				 		<button>BASSET HOOUNDS DROOL</button>
				 	</div>
				 	

                </div>)

	}

}

module.exports = AdminPanel

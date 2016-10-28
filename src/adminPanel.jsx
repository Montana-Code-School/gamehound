import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import ToggleList from './toggleList'
import _ from 'lodash'

var request = requests.request
//hi

class AdminPanel extends React.Component{

	constructor() {
	  super();
	  this.state = {gamePostSuccess: false,
	  				type: new ToggleList(),
	  				tutorial: new ToggleList(),
	  				instruction: new ToggleList(),
	  				numPlayers: new ToggleList(),
	  				itemsNeeded: new ToggleList()
	  				}

	}

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
										}, () => {this.setState({gamePostSuccess: true,
																 tutorial:new ToggleList})}
				)
	}

	add(event, newInput, stateName){ // Fix this!!!! 
         if(event.charCode === 13){
            event.preventDefault()
            this.stateToggler(this.state.newInput, stateName);
         }
    }

	stateToggler(newInput, stateName){ /// Need to address bug from refactored state toggler... 
		if(this.refs.textareaInput){
			this.refs.textareaInput.value = "";
			this.setState({stateName: 'this.state.' + stateName + 'addToTextList(newInput)'})
		} else {
			this.setState({stateName: this.state.stateName.toggle(newInput)})
		}
	}

	mapTextList(stateName){ // Probably a problem here too...
		var arraysToMap = 'state.' + stateName + '.list'
		const textList = _.get(this, arraysToMap)
		if(textList.length !== 0) {
			return textList.map(text => <li>{text}</li>)
		}
	}


	clearState() {
		this.setState({tutorial:new ToggleList()})
	}



	render(){
		var btn = "btn btn-primary";

		if(!this.state.gamePostSuccess){
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
			        		      return (<label className={btn} key={num} onClick={()=>this.stateToggler(num, numPlayers)}>
								    <input type="checkbox" autoComplete="off"/>{gameLabel}
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
						  (<label className={btn} key={gameType} onClick={(e) =>this.stateToggler(gameType, type)}>
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
					 		<ul>
					 		{this.mapTextList('itemsNeeded')}
					 		</ul>
					 		<input type="text" ref="textareaInput" onChange={(e)=>this.setState({item:e.target.value})} onKeyPress={this.add.bind(this)}/>
					 		<button className="btn btn-success" onClick={()=>this.stateToggler(this.state.item, itemsNeeded)}>Add Item</button>
					 	</div>

					 	<h3>Tutorial</h3>

					 	<div>
					 		<ol>
					 		{this.mapTextList('tutorial')}
					 		</ol>
					 		<textarea ref="textareaInput" onChange={(e)=>this.setState({instruction:e.target.value})} rows="2" cols="50" onKeyPress={this.add.bind(this)}></textarea>
					 		<button className="btn btn-success" onClick={()=>this.stateToggler(this.state.instruction, tutorial)}>Add Instruction</button>
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
					 		<button className="btn btn-success" onClick={this.createGame.bind(this)}>Submit Game</button>
					 		<button className="btn btn-warning" onClick={()=>this.setState({tutorial: new ToggleList()})}>Clear Everything Forever</button>

					 	</div>
					 	

	                </div>)
	    } else {
	    	return (<div>
	    				<h3>Congrats! You have submitted a game!</h3>
	    				<button className="btn btn-success" onClick={()=>this.setState({gamePostSuccess: false})}>Create Another Game</button>
	    			</div>
	    		)
	    }
	}

}

module.exports = AdminPanel

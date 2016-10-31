import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import ToggleList from './toggleList'
import _ from 'lodash'

var request = requests.request

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
									 tutorial:new ToggleList(),
									 itemsNeeded:new ToggleList()})}
				)
	}

// This definitely needs some work, currently nonfunctioning. For HTML fields key: "value",  onKeyPress={this.add.bind(this)}
	// add(event){ 
	// 	console.log("does this happen first?")
 //         if(event.charCode === 13){
 //            event.preventDefault()
 //            this.stateToggler(this.state.item, "itemsNeeded");
 //            console.log("we made it down here")
 //         } else if (event.charCode === 13 && this.state.instruction){
 //            event.preventDefault()
 //            this.stateToggler(this.state.instruction, "tutorial");
 //            console.log("we made it in the second else statement")
 //         }
 //    }

	stateToggler(newInput, stateName){
		var stateUpdate = {}
		if(stateName === "tutorial" || stateName === "itemsNeeded"){ // this is hard coded... is there a better way? 
			stateName === "tutorial" ? this.refs.tutorial.value = "" : this.refs.itemsNeeded.value = "" // this needs to change if you add more states to this function
			console.log("we made it past the setting the value blank")
			stateUpdate[stateName] = this.state[stateName].addToTextList(newInput)
			this.setState(stateUpdate)

		} else {
			stateUpdate[stateName] = this.state[stateName].toggle(newInput)
			this.setState(stateUpdate)
		}
	}

	mapTextList(stateName){ 
		var arraysToMap = 'state.' + stateName + '.list'
		const textList = _.get(this, arraysToMap)
		if(textList.length !== 0) {
			return textList.map(text => <li>{text}</li>)
		}
	}

	clearState() {
		this.setState({tutorial:new ToggleList(),
					   itemsNeeded: new ToggleList()})
	}

	render(){
		var btn = "btn btn-primary";
		if(!this.state.gamePostSuccess){
	        return  (<div className="container">

	        			<h2>Game Name</h2>
	        				<div>
	        					<input type="text" onChange={(e)=>this.setState({gameName:e.target.value})}/>
	        				</div>


	        			<h2>Number of Players</h2>

	        			<div className="btn-group" data-toggle="buttons">
		        			{[['1', 1] ,['2', 2], ['3', 3], ['4',4], ['5-7', 5], ['8+', 8]].map(numOfPlayers =>{
			        		      var gameLabel = numOfPlayers[0];
			        		      var num = numOfPlayers[1]
			        		      return (<label className={btn} key={num} onClick={()=>this.stateToggler(num, 'numPlayers')}>
								    <input type="checkbox" autoComplete="off"/>{gameLabel}
								  </label>)
							})}
					 	</div>



						<h2>Type</h2>

						<div className="btn-group" data-toggle="buttons">
						{["Icebreaker", 
						  'Card', 
						  'Dice', 
						  "Movement/Improv", 
						  "Party/Group", 
						  "Drinking", 
						  "Roadtrip", 
						  "Thought Provoking/Discussion"].map(gameType =>
						  (<label className={btn} key={gameType} onClick={(e)=>this.stateToggler(gameType, 'type')}>
				    		<input type="checkbox"  autoComplete="off"/> {gameType}
						  </label>))
					    }
			
						</div>

						<h2>Length</h2>
						
						<div className="btn-group" data-toggle="buttons">
		        			{[['5-10 minutes', 5] ,['15 minutes', 15], ['30 minutes', 30], ['1 hour', 60], ['>1 hour', 61]].map(time =>{
			        		      var gameLabel = time[0];
			        		      var num = time[1]
			        		      return (<label className={btn} key={num} onClick={()=>this.setState({time:num})}>
								    <input type="radio" autoComplete="off"/>{gameLabel}
								  </label>)
							})}
					 	</div>

					 	<h2>Description</h2>

					 	<div>
					 		<textarea onChange={(e)=>this.setState({description:e.target.value})}></textarea>
					 	</div>

					 	<h2>Items Needed</h2>

					 	<div>
					 		<ul>
					 		{this.mapTextList('itemsNeeded')}
					 		</ul>
					 		<textarea ref="itemsNeeded" onChange={(e)=>this.setState({item:e.target.value})} cols="25"></textarea>
					 		<button className="btn btn-success" onClick={()=>this.stateToggler(this.state.item, 'itemsNeeded')}>Add Item</button>
					 	</div>

					 	<h2>Tutorial</h2>

					 	<div>
					 		<ol>
					 		{this.mapTextList('tutorial')}
					 		</ol>
					 		<textarea ref="tutorial" onChange={(e)=>this.setState({instruction:e.target.value})} rows="2" cols="50"></textarea>
					 		<button className="btn btn-success" onClick={()=>this.stateToggler(this.state.instruction, 'tutorial')}>Add Instruction</button>
					 	</div>

					 	<h2>Rating</h2>
					 		<select onChange={(e)=>this.setState({rating:e.target.value})}>
							  <option value="0" > </option>
							  <option value="5" >5</option>
							  <option value="4">4</option>
							  <option value="3">3</option>
							  <option value="2">2</option>
							  <option value="1">1</option>
							</select>

	                	<h2>Difficulty</h2>

	                	<div className="btn-group" data-toggle="buttons">
		        			{['Easy', 'Medium', 'Hard'].map(levelOfDifficulty =>{
			        	
			        		      return (<label className={btn} key={levelOfDifficulty} onClick={()=>this.setState({difficulty:levelOfDifficulty})}>
								    <input type="radio" autoComplete="off"/>{levelOfDifficulty}
								  </label>)
							})}
					 	</div>

					 	<div>
					 		<button className="btn btn-success" onClick={this.createGame.bind(this)}>Submit Game</button>
					 		<button className="btn btn-warning" onClick={()=>this.setState({tutorial: new ToggleList})}>Clear Everything Forever</button>

					 	</div>
	                </div>)
	    } else {
	    	return (<div>
	    				<h2>Congrats! You have submitted a game!</h2>
	    				<button className="btn btn-success" onClick={()=>this.setState({gamePostSuccess: false})}>Create Another Game</button>
	    			</div>)
	    }
	}

}

module.exports = AdminPanel

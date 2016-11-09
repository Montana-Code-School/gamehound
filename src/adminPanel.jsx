import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import ToggleList from './toggleList'
import _ from 'lodash'
import {browserHistory} from 'react-router'

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
 //         if(event.charCode === 13){
 //            event.preventDefault()
 //            this.stateToggler(this.state.item, "itemsNeeded");
 //         } else if (event.charCode === 13 && this.state.instruction){
 //            event.preventDefault()
 //            this.stateToggler(this.state.instruction, "tutorial");
 //         }
 //    }

	stateToggler(newInput, stateName){
		var stateUpdate = {}
		if(stateName === "tutorial" || stateName === "itemsNeeded"){ // this is hard coded... is there a better way? 
			stateName === "tutorial" ? this.refs.tutorial.value = "" : this.refs.itemsNeeded.value = "" // this needs to change if you add more states to this function
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
			return textList.map(text => {
				return (<li>{text}
				<button type="button" className="btn btn-secondary btn-sm" id="tutorialBtn" onClick={()=>this.callRemoveText(stateName, text)}>X</button>
				</li>)
			})
		}
	}

	callRemoveText(nameOfState, textItem){
		var stateUpdate = {}
		stateUpdate[nameOfState] = this.state[nameOfState].removeTextFromList(textItem)
		this.setState(stateUpdate)
	}

	clearState() {
		this.setState({tutorial:new ToggleList(),
					   itemsNeeded: new ToggleList()})
	}

	redirect(){
		browserHistory.push('/')
	}

	render(){
		var btn = "btn btn-primary btn-lg raised";
		if(this.props.loggedIn){
			if(!this.state.gamePostSuccess){
		        return  (<div className="container">

		        			<h2>Game Name</h2>
		        				<div>
		        					<input type="text" onChange={(e)=>this.setState({gameName:e.target.value})}/>
		        				</div>

		        			<hr className="style18" />



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

						 	<hr className="style18" />


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

							<hr className="style18" />

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

						 	<hr className="style18" />

						 	<h2>Description</h2>

						 	<div>
						 		<textarea onChange={(e)=>this.setState({description:e.target.value})} cols="100" rows="4"></textarea>
						 	</div>

						 	<hr className="style18" />

						 	<h2>Items Needed</h2>

						 	<div>
						 		<ul>
						 		{this.mapTextList('itemsNeeded')}
						 		</ul>
						 		<div>
						 			<textarea ref="itemsNeeded" onChange={(e)=>this.setState({item:e.target.value})} cols="50"></textarea>
						 		</div>
						 		<button className="btn btn-success btn-lg raised" onClick={()=>this.stateToggler(this.state.item, 'itemsNeeded')}>Add Item</button>
						 	</div>

						 	<hr className="style18" />

						 	<h2>Tutorial</h2>

						 	<div>
						 		<ol>
						 		{this.mapTextList('tutorial')}
						 		</ol>
						 		<div>
						 			<textarea ref="tutorial" onChange={(e)=>this.setState({instruction:e.target.value})} rows="4" cols="100"></textarea>
						 		</div>
						 		<button className="btn btn-success btn-lg raised" onClick={()=>this.stateToggler(this.state.instruction, 'tutorial')}>Add Instruction</button>
						 	</div>

						 	<hr className="style18" />

						 	<h2>Rating</h2>
						 		<select onChange={(e)=>this.setState({rating:e.target.value})}>
								  <option value="0" > </option>
								  <option value="5" >5</option>
								  <option value="4">4</option>
								  <option value="3">3</option>
								  <option value="2">2</option>
								  <option value="1">1</option>
								</select>

							<hr className="style18" />

		                	<h2>Difficulty</h2>

		                	<div className="btn-group" data-toggle="buttons">
			        			{['Easy', 'Medium', 'Hard'].map(levelOfDifficulty =>{
				        	
				        		      return (<label className={btn} key={levelOfDifficulty} onClick={()=>this.setState({difficulty:levelOfDifficulty})}>
									    <input type="radio" autoComplete="off"/>{levelOfDifficulty}
									  </label>)
								})}
						 	</div>

						 	<hr className="style18" />

						 	<div>
						 		<button className="btn btn-success btn-lg raised" id="submitButton" onClick={this.createGame.bind(this)}>Submit Game</button>
						 		<button className="btn btn-warning btn-lg raised" onClick={()=>this.setState({tutorial: new ToggleList})}>Clear</button>

						 	</div>
		                </div>)
		    } else {
		    	return (<div>
		    				<h2>Congrats! You have submitted a game!</h2>
		    				<button className="btn btn-success btn-lg raised" onClick={()=>this.setState({gamePostSuccess: false})}>Create Another Game</button>
		    			</div>)
		    } 
		} else {
			return (<div>
				<p>Please wait...</p>
				{this.redirect()}
			</div>)
		}
	}

}

module.exports = AdminPanel

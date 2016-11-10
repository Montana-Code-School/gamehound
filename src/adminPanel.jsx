import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import ToggleList from './toggleList'
import _ from 'lodash'
import {browserHistory} from 'react-router'

var request = requests.request

class AdminPanel extends React.Component{

	// gamePostSuccess state to redirect page to "Congrats! You successfully added game!" page
	// ToggleLists are needed to create all of the arrays and toggle some of them when they are clicked
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

	componentDidMount() {
        document.body.scrollTop = 0;
    }

	// method uses request function to use /api/game route to post a game to DB
	// the callback sets all of the states to empty so that if the user returns to the page
	// with an uncompleted game, then the states won't still be set to the old input
	// ToggleList, undefined, and empty string determined based on the Game model

	createGame() {
		console.log("create game button")
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
									 itemsNeeded:new ToggleList(),
									 renderedGames: null,
             	   					 difficulty: undefined,
				               	     time: undefined,
				                     type: new ToggleList(),
				               	     numPlayers: new ToggleList(),
								   	 rating: undefined,
								   	 gameName: "",
								   	 description: "",
								   	 item: "",
								   	 instruction: ""
									})}

				)
	}

	// will either push user values to the array states (like in the case of items needed), 
	// or toggle the state on or off if it is a boolean selection button (like in the case of type)
	// adds new properties to an empty object and then sets the state to the new object
	// the addToTextList and toggle methods are found on toggleList.js

	stateToggler(newInput, stateName){
		var stateUpdate = {}
		if(stateName === "tutorial" || stateName === "itemsNeeded"){ 
			stateName === "tutorial" ? this.refs.tutorial.value = "" : this.refs.itemsNeeded.value = "" 
			stateUpdate[stateName] = this.state[stateName].addToTextList(newInput)
			this.setState(stateUpdate)
		} else {
			stateUpdate[stateName] = this.state[stateName].toggle(newInput)
			this.setState(stateUpdate)
		}
	}

	// if there are itemsNeeded or tutorial states, 
	// this will map these items above the box and also add a button next to them 
	// that can be used to remove the array item from the state

	mapTextList(stateName){ 
		var arraysToMap = 'state.' + stateName + '.list'
		const textList = _.get(this, arraysToMap)
		if (textList.length !== 0) {
			return textList.map(text => {
				return (
					<li>{text}
					<button type="button" className="btn btn-info btn-xs" id="tutorialBtn" onClick={()=>this.callRemoveText(stateName, text)}>x</button>
					</li>
						)
			})
		}
	}

	// initializes an empty object, deletes the array item from the state if x is pushed, 
	// sets remaining items to a new object and sets the state to that new object

	callRemoveText(nameOfState, textItem){
		var stateUpdate = {}
		stateUpdate[nameOfState] = this.state[nameOfState].removeTextFromList(textItem)
		this.setState(stateUpdate)
	}

	redirect(){
		browserHistory.push('/')
	}

	clearButton(){
		var confirmation = confirm("Are you sure you want to delete this game?")
		if(confirmation){
			this.setState({tutorial:new ToggleList(),
			itemsNeeded:new ToggleList(),
			renderedGames: null,
			difficulty: undefined,
	   	    time: undefined,
	        type: new ToggleList(),
	   	    numPlayers: new ToggleList(),
		   	rating: undefined,
		    gameName: "",
		   	description: "",
		   	item: "",
		   	instruction: ""});
		   	this.refs.tutorial.value = "";
		   	this.refs.itemsNeeded.value = ""
		   	this.refs.gameName.value = "";
		   	this.refs.description.value = ""
		}
	}

	render(){
		var btn = "btn btn-primary";
		if(this.props.loggedIn){ // if the user is logged in
			if(!this.state.gamePostSuccess){ // and the user has not just successfully posted a game
		        return  (<div className="container">

		        			<h1 className="rainbow pageHeader">
			                    {"Create a Game".split("").map(letter=> <span className="rainbow">{letter}</span> )}
		                    </h1>

		        			<h2>Game Name</h2>
		        				<div>
		        					<input ref="gameName" type="text" onChange={(e)=>this.setState({gameName:e.target.value})}/>
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
						 		<textarea ref="description" onChange={(e)=>this.setState({description:e.target.value})} cols="100" rows="4"></textarea>
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
						 		<button className="btn btn-success" onClick={()=>this.stateToggler(this.state.item, 'itemsNeeded')}>Add Item</button>
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
						 		<button className="btn btn-success" onClick={()=>this.stateToggler(this.state.instruction, 'tutorial')}>Add Instruction</button>
						 	</div>

						 	<hr className="style18" />

						 	<h2>Rating</h2>
						 		<select onChange={(e)=>this.setState({rating:e.target.value})}>
								  <option value="0" > </option>
								  <option value="5">5</option>
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
						 		<button className="btn btn-success" id="submitButton" onClick={this.createGame.bind(this)}>Submit Game</button>
						 		<button className="btn btn-warning" onClick={()=>this.clearButton()}>Clear</button>
						 	</div>
		                </div>)
		    } else {
		    	return (<div>
		    				<h2>Congrats! You have submitted a game!</h2>
		    				<button className="btn btn-success" onClick={()=>this.setState({gamePostSuccess: false})}>Create Another Game</button>
		    			</div>)
		    } 
		} else {
			return (
				<div>
					<p>Please wait...</p>
					{this.redirect()}
				</div>
					)
		}
	}
}

module.exports = AdminPanel

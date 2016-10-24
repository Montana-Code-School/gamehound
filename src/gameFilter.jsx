// Need make it so that if a button is clicked multiple times, it is turned on or off
// Make things look badass. (Greater color change when toggeled)

import React from 'react';
import requests from './request.js'

var request = requests.request

class GameFilter extends React.Component {
        		//number of players, type, amount of time, difficulty

  constructor(props) {
    super(props);
    this.state = {type: []}
    // Operations usually carried out in componentWillMount go here
  }

render() {
	


        return  (<div>
        			<h3>How many people are playing?</h3>
        			<div className="btn-group" data-toggle="buttons">
					  <label className="btn btn-primary" onClick={()=>this.setState({numPlayers:1})}>
					    <input type="radio" name="numPlayers" id="1player" autocomplete="off"/>1
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({numPlayers:2})}>
					    <input type="radio" name="numPlayers" id="2players" autocomplete="off"/>2
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({numPlayers:3})}>
					    <input type="radio" name="numPlayers" id="3players" autocomplete="off"/>3
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({numPlayers:4})}>
					    <input type="radio" name="numPlayers" id="4players" autocomplete="off"/>4
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({numPlayers:5})}>
					    <input type="radio" name="numPlayers" id="5to7players" autocomplete="off"/>5-7
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({numPlayers:8})}>
					    <input type="radio" name="numPlayers" id="8plusplayers" autocomplete="off"/>8+ 
					  </label>
					</div>

					<h3>What type(s) of game would you like to play?</h3>

					<div className="btn-group" data-toggle="buttons">
					  <label className="btn btn-primary" onClick={()=>this.setState({type:this.state.type.concat(["Icebreaker"])})}>
					    <input type="checkbox" id="icebreaker" autocomplete="off"/> Icebreaker
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({type:this.state.type.concat(["Card"])})}>
					    <input type="checkbox" id="card" autocomplete="off"/>Card
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({type:this.state.type.concat(["Dice"])})}>
					    <input type="checkbox" id="dice" autocomplete="off"/>Dice
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({type:this.state.type.concat(["Movement/Improv"])})}>
					    <input type="checkbox" id="movement-improv" autocomplete="off"/>Movement/Improv
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({type:this.state.type.concat(["Party/Group"])})}>
					    <input type="checkbox" id="party-group" autocomplete="off"/>Party/Group
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({type:this.state.type.concat(["Drinking"])})}>
					    <input type="checkbox" id="drinking" autocomplete="off"/>Drinking
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({type:this.state.type.concat(["Roadtrip"])})}>
					    <input type="checkbox" id="roadtrip" autocomplete="off"/>Roadtrip
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({type:this.state.type.concat(["Thought Provoking/Discussion"])})}>
					    <input type="checkbox" id="thoughtprovoking-discussion" autocomplete="off"/>Thought Provoking/Discussion
					  </label>
					</div>

					<h3>How long would you like the game to be?</h3>

					<div className="btn-group" data-toggle="buttons">
					  <label className="btn btn-primary" onClick={()=>this.setState({time:5})}>
					    <input type="checkbox" id="5-10min" autocomplete="off"/> 5-10 minutes
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({time:15})}>
					    <input type="checkbox" id="15min" autocomplete="off"/>15 minutes
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({time:30})}>
					    <input type="checkbox" id="30min" autocomplete="off"/>30 minutes
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({time:60})}>
					    <input type="checkbox" id="1hour" autocomplete="off"/>1 hour
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({time:61})}>
					    <input type="checkbox" id="1hour-plus" autocomplete="off"/> >1 hour
					  </label>
					</div>
                	


                	<h3>How difficult of a game do you want to play?</h3>

					<div className="btn-group" data-toggle="buttons">
					  <label className="btn btn-primary" onClick={()=>this.setState({difficulty:"Easy"})}>
					    <input type="radio" name="difficulty" id="easy" autocomplete="off"/>Easy
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({difficulty:"Medium"})}>
					    <input type="radio" name="difficulty" id="medium" autocomplete="off"/>Medium
					  </label>
					  <label className="btn btn-primary" onClick={()=>this.setState({difficulty:"Hard"})} >
					    <input type="radio" name="difficulty" id="hard" autocomplete="off"/>Hard
					  </label>
					</div>

                </div>)
  }


}


module.exports = GameFilter
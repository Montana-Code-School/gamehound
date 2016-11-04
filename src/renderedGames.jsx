import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import _ from 'lodash'
import {browserHistory} from 'react-router'
import ToggleList from './toggleList.js'

var request = requests.request

class RenderedGames extends React.Component {
  	
  	constructor(props) {
	  super(props);
	  this.state = {type: new ToggleList(),
	  				renderedGames: null
	  				 }
	}

	stateToggler(newType){
		this.setState({type: this.state.type.toggle(newType)})
	}

  	dontShowEmpty(prop){ //Can maybe use to generalize if needed? 
  		if(prop.length !== 0){
  			return (<li className="list-group-item"><h3>Items Needed:</h3> <h4>{prop}</h4></li>)
  		}
  	}

  	clearState(){
  		this.setState({renderedGames: null,
  					   difficulty: undefined,
  		    		   time: undefined,
  		    		   type: new ToggleList(),
  		    		   numPlayers: undefined
  		    		}) 
  	}
	
	render(){
		return (
    			<div>
        			<div>
        				<h1>hello</h1>
        				<button className="btn btn-success" onClick={() => browserHistory.push('/')}>Search Again</button>
        			</div>
        			<ul className="list-group">
        				{(this.props.renderedGames|| []).map(game => (<div><li className="list-group-item"><h3>Name:</h3> <h4>{game.gameName}</h4></li>
        													   		<li className="list-group-item"><h3>Percent Match:</h3> <h4>{game.totalScore}%</h4></li>
        													   	    <li className="list-group-item"><h3>Description:</h3> <h4>{game.description}</h4></li>
        													   	    {this.dontShowEmpty(game.itemsNeeded.join(", "))}
        													   	    <li className="list-group-item"><h3>Type:</h3> <h4>{game.type.join(", ")}</h4></li>
        													   </div>))}
        			</ul>
    			</div>)
	}

}

module.exports = RenderedGames
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
  			return (<div className="col-md-4">
                    <h4>Items Needed:</h4> <h4 className="renderedResult">{prop}</h4>
                </div>)
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
        				<button className="btn btn-success" onClick={() => browserHistory.push('/')}>Search Again</button>
        			</div>
        			<ul className="list-group">
        				{(this.props.renderedGames|| []).map(game => (

                                    <div className="container">

                                      <div className="renderedGame">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <h4>Name:</h4> <h4 className="renderedResult">{game.gameName}</h4>
                                          </div>
                                          <div className="col-md-4">
          													   		  <h4>Percent Match:</h4> <h4 className="renderedResult">{game.totalScore}%</h4>  
                                          </div>
                                        </div>

                                        
                                      <div className="row">
                                        <div className="col-md-5">
                                           <h4>Type:</h4> <h4 className="renderedResult">{game.type.join(", ")}</h4>
                                        </div>

                                        {this.dontShowEmpty(game.itemsNeeded.join(", "))}

                                      </div>


                                      <div className="row">
                                        <div className="col-md-12">
                                          <h4>Description:</h4> <h4 className="renderedResult">{game.description}</h4>
        													   	  </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-md-8">
                                          <button className="btn btn-success">How to Play -> (we need to add a Link route here with params for URL)</button>
                                        </div>
                                      </div>
                                    </div>
                                        
                                  </div>


                                     ))}
        			</ul>
    			</div>)
	}

}

module.exports = RenderedGames
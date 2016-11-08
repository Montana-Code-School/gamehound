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
    var carouselId = 0;
    var self = this;
    console.log("This is a list of our games", this.props.renderedGames.map((game)=> game.gameName ))
		return (
    			<div>
      			<div>
      				<button className="btn btn-success btn-lg raised" onClick={() => browserHistory.push('/')}>Search Again</button>
    			</div>
      			<ul className="list-group">
      				{(this.props.renderedGames|| []).map(function(game) { 
               
                carouselId++;
                return (
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
                        {self.dontShowEmpty(game.itemsNeeded.join(", "))}
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                         <h4>Description:</h4> <h4 className="renderedResult">{game.description}</h4>
							   	      </div>
                      </div>

                      <div className="row">
                        <div className="col-md-8">


                          <button className="btn btn-success btn-lg raised" data-toggle="modal" data-target={".tutorial-modal" + carouselId}>How to Play -></button>

                          <div className={"modal fade tutorial-modal" + carouselId} tabIndex="-1" role="dialog" aria-labelledby="largeTutorialModal" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                <div id={"tutorial-carousel" + carouselId} className="carousel slide" data-ride="carousel">
                                  <div className="carousel-inner">
                                    <div className="item active">
                                     <img className="img-responsive" src="http://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                                      <div className="carousel-caption">
                                        {game.tutorial[0]}
                                      </div>
                                    </div>
                                  {game.tutorial.slice(1,game.tutorial.length).map(function(instruction) {
                                      return (<div className="item">
                                      <img className="img-responsive" src="http://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                                      <div className="carousel-caption">
                                          {instruction}
                                      </div>
                                    </div>)


                                  })}
                                    



                                  </div>

                                <a className="left carousel-control" href={"#tutorial-carousel" + carouselId} role="button" data-slide="prev">
                                  <span className="glyphicon glyphicon-chevron-left"></span>
                                </a>
                                <a className="right carousel-control" href={"#tutorial-carousel" + carouselId}  role="button" data-slide="next">
                                  <span className="glyphicon glyphicon-chevron-right"></span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>                  
                      </div>
                    </div>
                  </div> 
                </div>

                ) 

              }
            )
          }
        </ul>
    	</div>
    )
	}
}

module.exports = RenderedGames
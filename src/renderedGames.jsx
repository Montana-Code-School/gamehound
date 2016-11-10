import React from 'react';
import keydown from 'react-keydown';
import requests from './request.js'
import _ from 'lodash'
import {browserHistory, Link} from 'react-router'
import ToggleList from './toggleList.js'

var request = requests.request

class RenderedGames extends React.Component {

  constructor(props) {
  super(props);
  this.state = {type: new ToggleList(),
                renderedGames: null
               }
  }

  componentDidMount() {
        document.body.scrollTop = 0;
  }

  stateToggler(newType){
    this.setState({type: this.state.type.toggle(newType)})
  }

  dontShowEmpty(prop){ 
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
    var carouselId = 1;
    var carouselIndex = 0;
    var self = this;
    var page = _.get(this, 'props.params.page') || 1
    var numPerPage = 10
    return (
          <div>
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li>
                  <Link to={`/results/${page-1 ? page -1 : page }`}>
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                {
                  _.range(1, Math.ceil(self.props.renderedGames.length / numPerPage) + 1).map((x) => <li><Link to={`/results/${x}`}
                  >{x}</Link></li>)
                }
                <li>
                  <Link to={`/results/${parseInt(page) + 1 > Math.ceil(self.props.renderedGames.length / numPerPage) ? page : parseInt(page) + 1}`}>
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <button className="btn btn-success btn-lg" onClick={() => browserHistory.push('/')}>Search Again</button>
          </div>
            <ul className="list-group">
              {(this.props.renderedGames.slice((page-1) * numPerPage, (page) * numPerPage)|| []).map(function(game) { 
                  carouselId++;
                  carouselIndex = 0

                  var percentColor = game.totalScore < 80 ? (game.totalScore < 50 ? "yellow-percent" : "blue-percent") : "green-percent";

                  return (
                    <div className="container">

                      <div className="renderedGame">

                        <div className="row">
                          <div className="col-md-5">
                            <h4>Name:</h4> <h4 className="renderedResult">{game.gameName}</h4>
                          </div>
                          
                          <div className="col-md-4">
  								   		    <h4>Match:</h4> <h4 className={"renderedResult " + percentColor}>{game.totalScore}%</h4>  
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


                            <button className="btn btn-success btn-lg" data-toggle="modal" data-target={".tutorial-modal" + carouselId}>How to Play -></button>

                            <div className={"modal fade tutorial-modal" + carouselId} tabIndex="-1" role="dialog" aria-labelledby="largeTutorialModal" aria-hidden="true">
                              <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                  <div id={"tutorial-carousel" + carouselId} className="carousel slide" data-ride="carousel">
                                      <ol className="carousel-indicators">
                                        <li data-target={"#tutorial-carousel" + carouselId} data-slide-to={(carouselIndex).toString()} className="active"></li>
                                        {game.tutorial.slice(1,game.tutorial.length).map(function(x){
                                          return (
                                            <li data-target={"#tutorial-carousel" + carouselId} data-slide-to={(++carouselIndex).toString()} ></li>)
                                          }) 
                                        }
                                      </ol>
                                    <div className="carousel-inner">
                                      <div className="item active">
                                       <img className="img-responsive" src="https://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                                        <div className="carousel-caption">
                                          1. {game.tutorial[0]}
                                        </div>
                                      </div>
                                    {game.tutorial.slice(1,game.tutorial.length).map(function(instruction) {
                                        return (<div className="item">
                                        <img className="img-responsive" src="https://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                                        <div className="carousel-caption">
                                          {game.tutorial.indexOf(instruction) + 1}. {instruction}
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
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li>
                <Link to={`/results/${page-1 ? page -1 : page }`}>
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {
                _.range(1, Math.ceil(self.props.renderedGames.length / numPerPage) + 1).map((x) => <li><Link to={`/results/${x}`}>{x}</Link></li>)
              }
              <li>
                <Link to={`/results/${parseInt(page) + 1 > Math.ceil(self.props.renderedGames.length / numPerPage) ? page : parseInt(page) + 1}`}>
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </ul>
      </div>
    )
  }
}

module.exports = RenderedGames
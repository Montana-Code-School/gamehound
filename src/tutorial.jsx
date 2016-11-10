import React from 'react';
import RenderedGames from './renderedGames.jsx'
import keydown from 'react-keydown';
import requests from './request.js'
import _ from 'lodash'
import {browserHistory, Link} from 'react-router'
import ToggleList from './toggleList.js'

var request = requests.request

class Tutorial extends React.Component {

  carouselTutorial(name, carouselId, carouselIndex, tutorial){
    if(name === "Just a Minute! "){
      return (
        <div className={"modal fade tutorial-modal" + carouselId} tabIndex="-1" role="dialog" aria-labelledby="largeTutorialModal" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div id={"tutorial-carousel" + carouselId} className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target={"#tutorial-carousel" + carouselId} data-slide-to={(carouselIndex).toString()} className="active"></li>
                  {tutorial.slice(1,tutorial.length).map(function(x){
                    return (
                      <li data-target={"#tutorial-carousel" + carouselId} data-slide-to={(++carouselIndex).toString()}></li>)
                    }) 
                  }
                </ol>
                <div className="carousel-inner">
                  <div className="item active">
                   <img className="img-responsive" src="https://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                    <div className="carousel-caption">
                        <div>
                          <img src="/imgs/car-ride.gif" />
                        </div>
                      <span>1.</span> {tutorial[0]}
                    </div>
                  </div>
                  <div className="item">
                    <img className="img-responsive" src="https://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                      <div className="carousel-caption">
                        <div>
                          <img src="/imgs/person-talking.png" />
                        </div>
                        <span>2.</span> {tutorial[1]}
                      </div>
                  </div>
                  <div className="item">
                    <img className="img-responsive" src="https://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                      <div className="carousel-caption">
                        <div>
                          <img src="/imgs/ref-2.jpg" />
                        </div>
                        <span>3.</span> {tutorial[2]}
                      </div>
                  </div>
                  <div className="item">
                    <img className="img-responsive" src="https://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                      <div className="carousel-caption">
                        <div>
                          <img src="/imgs/epic-win.png" />
                        </div>
                        <span>4.</span>  {tutorial[3]}
                      </div>
                  </div>
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
        </div>)
    } else {
      return (<div className={"modal fade tutorial-modal" + carouselId} tabIndex="-1" role="dialog" aria-labelledby="largeTutorialModal" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div id={"tutorial-carousel" + carouselId} className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target={"#tutorial-carousel" + carouselId} data-slide-to={(carouselIndex).toString()} className="active"></li>
                  {tutorial.slice(1,tutorial.length).map(function(x){
                    return (
                      <li data-target={"#tutorial-carousel" + carouselId} data-slide-to={(++carouselIndex).toString()} ></li>)
                    }) 
                  }
                </ol>
              <div className="carousel-inner">
                <div className="item active">
                 <img className="img-responsive" src="https://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                  <div className="carousel-caption">
                    1. {tutorial[0]}
                  </div>
                </div>
              {tutorial.slice(1,tutorial.length).map(function(instruction) {
                  return (<div className="item">
                  <img className="img-responsive" src="https://placehold.it/1200x800/eee/000&text=&nbsp;" alt="..." />
                  <div className="carousel-caption">
                    {tutorial.indexOf(instruction) + 1}. {instruction}
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
    </div>)
    }
  }

  render() {
    return (
      <div>
          {this.carouselTutorial(this.props.game, this.props.carouselId, this.props.carouselIndex, this.props.gameTutorial)}
      </div>
      )
  }

}

module.exports = Tutorial
import React from 'react';
import GameFilter from './gameFilter.jsx'
import NavBar from './navBar.jsx'

class Header extends React.Component {

	render(){
		console.log(this.props.children)
	    return (
	    		
	    	<div className="container">
	    		<NavBar setLogin={this.props.setLogin} loggedIn={this.props.loggedIn}/>
 					
 					<div className="jumbotron row">
	                    <img src="/imgs/bassetgif.gif" id="dog" className="col-lg-3 col-md-3 col-sm-3 col-xs-12"/>
	                	<div className="col-lg-8 col-sm-8 col-xs-8 rainbow">
                        	<h1>
                        		{"Gamehound".split("").map(letter=> <span className="rainbow">{letter}</span> )}
                        	</h1>
                    	</div>
                     	<div className="col-lg-8 col-sm-8 col-xs-8" id="tagline">
                        	<h3>Find the right game at the right time.</h3>
                    	</div>
	                </div>
                    
                    <div>
	                	{this.props.children || <GameFilter/>}
	                </div>
	        </div> )
	}
}

module.exports = Header;
import React from 'react';
import GameFilter from './gameFilter.jsx'
import NavBar from './navBar.jsx'

class Header extends React.Component {

	render(){
	    return (
	    		
	    	<div className="container">
	    		<NavBar setLogin={this.props.setLogin} loggedIn={this.props.loggedIn}/>
 					
                    
                    <div>
	                	{this.props.children || <GameFilter/>}
	                </div>
	        </div> )
	}
}

module.exports = Header;
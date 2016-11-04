import React from 'react';
import GameFilter from './gameFilter.jsx'

class Header extends React.Component {

	render(){
	    return (<div className="container">

 					<div className="row">
	                    
	                    <div className="col-lg-4 col-sm-4 col-xs-4">
	                        <img src="/imgs/bassetgif.gif" width='60%' />
	                    </div>

	                </div>

	    			<div className="row">

	                    <div className="col-lg-4 col-sm-4 col-xs-4">
	                        <h1>Gamehound</h1>
	                    </div>
	                     <div className="col-lg-8 col-sm-8 col-xs-8">
	                        <h3>Find the right game at the right time.</h3>
	                    </div>

	                </div>
	                {this.props.children || <GameFilter/>}
	            </div> )
	}
}

module.exports = Header;
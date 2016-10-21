import React from 'react';

class Header extends React.Component {

	render(){
	    return (<div className="container">
	                <div className="row">
	                    <div className="col-md-4 col-sm-4 col-xs-4 vcenter">
	                        <h1>Hello World!</h1>
	                    </div>
	                    <div className="col-md-8 col-sm-8 col-xs-8 vcenter">
	                        <img src="http://cdn1-www.dogtime.com/assets/uploads/2011/01/file_23010_basset-hound-460x290.jpg" />
	                    </div>
	                </div>
	            </div> )
	}
}

module.exports = Header;
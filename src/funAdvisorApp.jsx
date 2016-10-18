import React from 'react';
import ReactDOM from 'react-dom';
import GameFilter from './gameFilter.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';
import SignUp from './signup.jsx';
import requests from './request.js';

var request = requests.request


class FunAdvisorApp extends React.Component {
    componentWillMount() {
        request('/api/user', 'GET', null, loggedInResp => {
          request('/api/story', 'GET', null, storyResponse => 
            this.setState({stories: storyResponse,
            			   loggedIn: loggedInResp.loggedIn
            			})
            )
        })
    }

    render() {
        if(!this.state){
        	return <div>loading... </div>
        } else {
        	return (<div>
        			 <GameFilter />
        			</div>)
        } 
    }
}

ReactDOM.render(<FunAdvisorApp/>, document.getElementById('app'));

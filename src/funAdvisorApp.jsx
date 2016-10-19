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
            this.setState({loggedIn: loggedInResp.loggedIn
                        })
        })
    }

    setLogin(value){
        this.setState({loggedIn: value})
    }
    
    render() {
        if(!this.state){
            return <div>loading... </div>
        } else if (!this.state.loggedIn){
            return (<div>
                     <Login setLogin={this.setLogin.bind(this)}/>
                     <SignUp setLogin={this.setLogin.bind(this)}/>
                    </div>)
        } else {
            return (<div> 
                    <Logout setLogin={this.setLogin.bind(this)}/>
                   </div>)
        };
    }
}


ReactDOM.render(<FunAdvisorApp/>, document.getElementById('app'));

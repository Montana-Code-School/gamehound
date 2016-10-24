import React from 'react';
import ReactDOM from 'react-dom';
import GameFilter from './gameFilter.jsx';
import requests from './request.js';
import UserManagement from './userManagement.jsx'
import Header from './header.jsx'

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
        } else {
            return (<div>
                     <Header/>
                     <UserManagement setLogin={this.setLogin.bind(this)} loggedIn={this.state.loggedIn} />
                     <GameFilter />
                    </div>)
        }
    }
}


ReactDOM.render(<FunAdvisorApp/>, document.getElementById('app'));

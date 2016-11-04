


import React from 'react';
import ReactDOM from 'react-dom';
import GameFilter from './gameFilter.jsx';
import AdminPanel from './adminPanel.jsx'
import requests from './request.js';
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import _ from 'lodash'
import Header from './header.jsx'
import SignUp from './signup.jsx'
import Login from './login.jsx'


var request = requests.request


class FunAdvisorApp extends React.Component {
    componentWillMount() {
        request('/api/user', 'GET', null, loggedInResp => {
            this.setState({ loggedIn: loggedInResp.loggedIn,
                            funAdvUsername: _.get(loggedInResp,"user.username")                       
                        })
        })
    }

    

    setLogin(response){
        this.setState({loggedIn: response.loggedIn})

        if(this.state && !this.state.loggedIn){
            this.setState({funAdvUsername:null})
        } else {
            this.setState({funAdvUsername: response.user.username})
        }
    }


    render() {

    return (<Router history = {browserHistory}>
        <Route path="/" component={Header}>
            <IndexRoute component={GameFilter}/>
            <Route path="results" component={Header}/>
            <Route path="game/:gameId" component={Header}/>
            <Route path="login" component={() => <Login setLogin={this.setLogin.bind(this)}/>}/>
            <Route path="signup" component={SignUp}/>
        </Route>
    </Router>)
    }
}
ReactDOM.render(<FunAdvisorApp/>, document.getElementById('app'));

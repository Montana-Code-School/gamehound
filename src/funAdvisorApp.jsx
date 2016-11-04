


import React from 'react';
import ReactDOM from 'react-dom';
import GameFilter from './gameFilter.jsx';
import AdminPanel from './adminPanel.jsx'
import requests from './request.js';
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import UserManagement from './userManagement.jsx'
import _ from 'lodash'
//all components

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
            <Route path="/results" component={Header}/>
            <Route path="game" component={Header}/>
            <Route path="profile/:userName" component={Header}/>
            <Route path="login" component={Login}/>
            <Route path="signup" component={SignUp}/>
        </Route>
    </Router>)

        
    }
}





// if(!this.state){
//             return <div>loading... </div>
//         } else if(this.state.loggedIn && this.state.funAdvUsername === 'admin'){ //When we are lost add parathensis to this 
//             return (<div>
//                      <Header/>
//                      <UserManagement setLogin={this.setLogin.bind(this)} loggedIn={this.state.loggedIn} />
//                      <AdminPanel/>
//                     </div>)
//         } else {
//             return (<div>
//                      <Header/>
//                      <UserManagement setLogin={this.setLogin.bind(this)} loggedIn={this.state.loggedIn} />
//                      <GameFilter />
//                     </div>)
//         }

















ReactDOM.render(<FunAdvisorApp/>, document.getElementById('app'));

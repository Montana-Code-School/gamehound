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
import RenderedGames from './renderedGames.jsx'
import ToggleList from './toggleList'
import Tutorial from './tutorial.jsx'

var request = requests.request


class FunAdvisorApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            renderedGames: [],
            type: new ToggleList(),
            loggedIn: false
        }
    }
    
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

    getGame(difficulty, type, numPlayers, time){
      console.log("This is the type", type)
      request('/api/game/recommend', "POST", {
                                  difficulty: difficulty,
                                  type: type,
                                  numPlayers: numPlayers,
                                  time: time

                                  }, 
                                 response => {

                                    this.setState({renderedGames:response})
                                    browserHistory.push('/results')
                                  })
    
    }

    render() {
        console.log('logged in ', this.state.loggedIn)
    return (<Router history = {browserHistory}>
        <Route path="/" component={(props) => <Header children={props.children} setLogin={this.setLogin.bind(this)} loggedIn={this.state.loggedIn}/>}>
            <IndexRoute component={() => <GameFilter getGame={this.getGame.bind(this)} /> }/>
            <Route path='results' component={() =>  <RenderedGames renderedGames={this.state.renderedGames} /> } /> 
            <Route path="game/:gameId" component={Header}/>
            <Route path="login" component={() => <Login setLogin={this.setLogin.bind(this)} loggedIn={this.state.loggedIn} /> } />
            <Route path="signup" component={SignUp}/>
            <Route path="adminPanel" component={()=> <AdminPanel loggedIn={this.state.loggedIn}/>}/>
        </Route>
    </Router>)
    }
}
ReactDOM.render(<FunAdvisorApp/>, document.getElementById('app'));



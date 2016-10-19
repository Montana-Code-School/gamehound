import React from 'react';
import requests from './request.js'

var request = requests.request

class GameFilter extends React.Component {


render() {

        return  (<div>
                    <input type="text" onChange={e => this.setState({difficulty: e.target.value})}/>
                </div>)
  }


}


import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
      awef:[]
  }

  componentDidMount(){
    fetch('/test')
      .then(res => {
        return res.json()
      })
      .then(awef => {
        this.setState({awef})
      });
  }

  render() {
    return (
      <div className="App">
        <h1> WHA </h1>
        {this.state.awef.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import DishesList from './dishes_list';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DishesList />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import DishesList from './dishes_list';
import Receipt from './receipt';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App padding-10">
        <div className="inline-block right padding-left-5">
          <Receipt />
        </div>
        <div className="overflow-hidden padding-right-5">
          <DishesList />
        </div>
      </div>
    );
  }
}

export default App;

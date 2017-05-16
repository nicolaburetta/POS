import React, { Component } from 'react';
import '../static/css/App.css';

class App extends Component {
  state = {dishes: []}

  componentDidMount() {
    fetch('/dishes')
      .then(res => res.json())
      .then(dishes => this.setState({ dishes }));
  }

  render() {
    return (
      <div className="App">
        <h1>Dishes</h1>
        { this.state.dishes.map(dish =>
            <div key={dish.id}>{dish.name} {dish.price} euro</div>
        )}
      </div>
    );
  }
}

export default App;

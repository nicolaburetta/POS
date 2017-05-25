import React, { Component } from 'react';
import DishesList from './dishes_list';
import Receipt from './receipt';
import QuantityLabel from './quantity_label';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { quantity: 1 };
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeQuantity(quantity) {
    this.setState({ quantity });
  }

  render() {
    return (
      <div className="App padding-10">
        <div className="inline-block right padding-left-5">
          <Receipt />
        </div>
        <div className="overflow-hidden padding-right-5">
          <DishesList
            quantity={this.state.quantity}
            onChangeQuantity={this.changeQuantity}/>
        </div>
        <div className="col-md-2">
          <QuantityLabel
            onChangeQuantity={this.changeQuantity}
            value={this.state.quantity}/>
        </div>
      </div>
    );
  }
}

export default App;

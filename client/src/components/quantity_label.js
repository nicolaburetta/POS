import React, { Component } from 'react';
import utils from '../utils/utils';

export default class QuantityLabel extends Component {
  constructor(props) {
    super(props);

    this.setQuantity = this.setQuantity.bind(this);
  }

  setQuantity(q, event) {
    if (utils.isInt(q) && q > 0) {
      this.props.onChangeQuantity(q);
    }
    event.preventDefault();
  }

  render() {
    return (
      <div
        className="quantity-label noselect"
        onClick={(event) => this.setQuantity(this.props.value + 1, event)}
        onContextMenu={(event) => this.setQuantity(this.props.value - 1, event)}
        value={this.props.value}
        >
        <div>
          <h3>Quantità</h3>
        </div>
        <div>
          <h1>{this.props.value}</h1>
        </div>
      </div>
    );
  }
};

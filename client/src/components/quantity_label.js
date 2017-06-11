import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addQuantity, removeQuantity } from '../actions/actions_quantity';

import utils from '../utils/utils';

class QuantityLabel extends Component {
  constructor(props) {
    super(props);

    this.setQuantity = this.setQuantity.bind(this);
  }

  setQuantity(q, event) {
    if (utils.isInt(q) && q > 0) {
      this.props.removeQuantity(q);
    }
    event.preventDefault();
  }

  render() {
    return (
      <div
        className="mylabel-content quantity-label noselect"
        onClick={() => this.props.addQuantity(1)}
        onContextMenu={(event) => this.setQuantity(1, event)}
        value={this.props.currentQuantity}
        >
        <div>
          <h3>Quantità</h3>
        </div>
        <div>
          <h1>{this.props.currentQuantity}</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ currentQuantity }) {
  return { currentQuantity };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addQuantity, removeQuantity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuantityLabel);

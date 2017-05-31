import React, { Component } from 'react';
import { connect } from 'react-redux';

import DishesList from './dishes_list';
import Receipt from './receipt';
import Modal from './modal';
import QuantityLabel from './quantity_label';
import LineLabel from './receipt_current_line_label';

import '../css/App.css';

class App extends Component {

  render() {
    const idmodal = 'modify-order';
    return (
      <div>
        <Modal idModal={idmodal} />
        <div className="App padding-10">
          <div className="inline-block right padding-left-5">
            <Receipt idModal={idmodal} />
          </div>
          <div className="overflow-hidden padding-right-5">
            <DishesList />
          </div>
          <div className="mylabel padding-0">
            <QuantityLabel />
          </div>
          <div className="mylabel padding-0">
            
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ order, currentQuantity }) {
  return { order, currentQuantity };
}

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DishesList from './dishes_list';
import Receipt from './receipt';
import Modal from './modal';
import QuantityLabel from './quantity_label';
import LineLabel from './receipt_current_line_label';
import FirstPage from './first_page';

import { clearOrder } from '../actions/actions_order';
import { resetQuantity } from '../actions/actions_quantity';
import { changeLine } from '../actions/actions_receipt';

import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.sendOrder = this.sendOrder.bind(this);
    this.changeAppInfo = this.changeAppInfo.bind(this);
    this.state = { cash_register: null, appType: null };
  }

  changeAppInfo({ cash_register, appType }) {
    this.setState({ cash_register, appType });
  }

  sendOrder() {
  	const payload = {
  		order: this.props.order,
  		cash_register: parseInt(this.state.cash_register, 10)
  	};
    console.log(this.props.order);
    if (this.props.order.length > 0) {
      fetch(`/insert-order`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.type === 'ok') {
            this.props.clearOrder();
            this.props.resetQuantity();
            this.props.changeLine(-1);
            alert(res.desc);
          } else {
            alert('Qualcosa è andato storto!');
          }
        });
    }
  }

  render() {
    if (this.state.cash_register == null) return ( <FirstPage changeAppInfo={this.changeAppInfo} /> );
    const idmodal = 'modify-order';

    if (this.state.appType === 'cucina') {
      return (
        <div>
          <Modal idModal={idmodal} />
          <div className="App padding-10">
            <div className="inline-block right padding-left-5">
              <Receipt idModal={idmodal} />
              <div className="confirm-button-container">
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  id="confirm-order-button"
                  onClick={() => this.sendOrder()}>Conferma</button>
              </div>
            </div>
            <div className="overflow-hidden padding-right-5" id="appbody">
              <div >
	            <h1 className="margin-top-0">Cucina</h1>
	            <DishesList type="cucina" />
	          </div>
	          <div>
	          	<h1 className="margin-top-0">Stand</h1>
	          	<DishesList type="stand" />
	          </div>
            </div>
            <div className="mylabel-container quantity-label padding-0">
              <QuantityLabel />
            </div>
            <div className="mylabel-container line-label padding-0">
              <LineLabel />
            </div>
          </div>
        </div>
      );
    } else if (this.state.appType === 'stand') {
      return (null);
    }
  }
}

function mapStateToProps({ order, currentQuantity }) {
  return { order, currentQuantity };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearOrder, resetQuantity, changeLine }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

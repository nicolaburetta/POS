import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeItem } from '../actions/actions_order';
import { changeLine } from '../actions/actions_receipt';

import printerUtils from '../utils/printer_utils';

class Receipt extends Component {
  constructor(props) {
    super(props);

    this.receiptRemoveItem = this.receiptRemoveItem.bind(this);
    this.receiptChangeLine = this.receiptChangeLine.bind(this);
    this.getNRows = this.getNRows.bind(this);
  }

  receiptRemoveItem() {
    this.props.removeItem(this.props.currentReceiptLine);
    this.props.changeLine(this.props.order.length - 2);
  }

  receiptChangeLine(event) {
    this.props.changeLine(event.target.value);
  }

  getNRows() {
    return this.props.order.map(item => {
      return item.add.length + item.remove.length + 1;
    }).reduce((a, b) => a + b, 0) + 4;
  }

  render() {
    const dataToggle = this.props.order.length > 0 ? 'modal' : '';
    return (
      <div className="form-group noselect">
        <textarea
          className="form-control background-white font-monospace text-center input-lg"
          rows={this.getNRows()}
          cols="48"
          readOnly
          value={'SCONTRINO - ANTEPRIMA\n' + printerUtils.formatText(this.props.order, true)}></textarea>

        <div className="receipt-form">
          <label className="sr-only" htmlFor="inlineFormInputMySelect">Line</label>
          <select
            className="form-control input-lg"
            id="inlineFormInputMySelect"
            onChange={this.receiptChangeLine}>
            <option defaultValue>Riga...</option>
            {
              this.props.order.map(
                (order, index) => {
                  return (
                    <option
                      key={index}
                      value={index}>{index + 1}</option>
                  );
                }
              )
            }
          </select>

          <div className="my-btn-container">
            <div className="btn-group btn-group-lg my-btn-group-ext">
              <div className="btn-group btn-group-lg my-btn-group-int">
                <button
                  type="button"
                  className="btn btn-danger"
                  id="delete-button"
                  onClick={() => this.receiptRemoveItem()}>Elimina</button>
              </div>
              <div className="btn-group btn-group-lg my-btn-group-int">
                <button
                  type="button"
                  className="btn btn-warning modify-button"
                  id="modify-button"
                  value={this.props.order.length}
                  data-toggle={dataToggle}
                  data-target={`#${this.props.idModal}`}>Modifica</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps({ order, currentReceiptLine }) {
  return { order, currentReceiptLine };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeItem, changeLine }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);

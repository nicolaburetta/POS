import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeItem } from '../actions/index';
import printerUtils from '../utils/printer_utils';

class Receipt extends Component {
  constructor(props) {
    super(props);

    this.state = { index: 99999 };
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem() {
    this.props.removeItem(this.state.index);
    this.setState({ index: 99999 });
  }

  render() {
    console.log(this.state.index);
    return (
      <div className="form-group noselect">
        <textarea
          className="form-control background-white font-monospace text-center input-lg"
          rows={this.props.order.length + 4}
          cols="48"
          readOnly
          value={'SCONTRINO - ANTEPRIMA\n' + printerUtils.formatText(this.props.order, true)}></textarea>

        <form className="form-inline receipt-form">
          <label className="sr-only" htmlFor="inlineFormInput">Line</label>
          <select
            className="form-control input-lg"
            id="inlineFormInput"
            onChange={event => this.setState({ index: event.target.value })}>
            <option defaultValue>Scegli...</option>
            {
              this.props.order.map(
                (order, index) => {
                  return (
                    <option
                      key={index}
                      value={index}>{index + 1}</option>
                  )
                }
              )
            }
          </select>

          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={() => this.removeItem()}>Elimina</button>
          <button type="button" className="btn btn-warning btn-lg">Modifica</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ order }) {
  return { order };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);

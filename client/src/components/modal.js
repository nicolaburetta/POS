import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { modifyItem } from '../actions/actions_order';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = { quantity: 0 };
    this.changeQuantity = this.changeQuantity.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  changeQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  renderSelect() {
    return (
      <select
        className="form-control input-lg"
        id="myselect"
        onChange={this.changeQuantity}>
        <option value="NaN">Scegli quantità</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
      </select>
    );
  }

  render() {
    return (
      <div className="modal fade" id={this.props.idModal} role="dialog">
        <div className="modal-dialog modal-lg">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" id="modal-close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modifica ordine (riga {this.props.currentReceiptLine + 1})</h4>
            </div>
            <div className="modal-body">
              <form className="form-inline">
                <label htmlFor="myselect">Quantità</label>
                { this.renderSelect() }
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary disabled"
                id="modal-submit"
                data-dismiss="modal"
                onClick={() => this.props.modifyItem(this.props.currentReceiptLine, this.state.quantity)}>Salva</button>
              <button type="button" className="btn btn-default" id="modal-dismiss" data-dismiss="modal">Annulla</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps({ currentReceiptLine }) {
  return { currentReceiptLine };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ modifyItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

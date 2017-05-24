import React, { Component } from 'react';
import { connect } from 'react-redux';
import printerUtils from '../utils/printer_utils';

class Receipt extends Component {
  render() {
    return (
      <div className="form-group">
        <textarea
          className="form-control background-white font-monospace text-center"
          rows={this.props.order.length + 4}
          cols="45"
          readOnly
          value={'SCONTRINO - ANTEPRIMA\n' + printerUtils.formatText(this.props.order, true)}></textarea>
      </div>
    );
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default connect(mapStateToProps)(Receipt);

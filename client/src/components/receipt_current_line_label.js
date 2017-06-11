import React, { Component } from 'react';
import { connect } from 'react-redux';

class LineLabel extends Component {
  render() {
    return (
      <div className="mylabel-content line-label noselect">
        <div>
          <h3>Riga</h3>
        </div>
        <div>
          <h1>{ (parseInt(this.props.currentReceiptLine, 10) + 1) }</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ currentReceiptLine }) {
  return { currentReceiptLine };
}

export default connect(mapStateToProps)(LineLabel);

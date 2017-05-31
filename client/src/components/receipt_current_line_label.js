import React, { Component } from 'react';
import { connect } from 'react-redux';

class LineLabel extends Component {
  render() {
    return (
      <div className="line-label noselect">
        <div>
          <h3>Riga</h3>
        </div>
        <div>
          <h1>{ this.props.currentReceiptLine }</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ currentReceiptLine }) {
  return { currentReceiptLine };
}

export default connect(mapStateToProps)(LineLabel);

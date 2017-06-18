import React, { Component } from 'react';

const defaultValue = 'null';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = { options: [], selected: defaultValue };
  }

  componentDidMount() {
    fetch('/addresses')
      .then(res => res.json())
      .then(addresses => this.setState({ options: addresses }));
  }

  changeValue(event) {
    this.setState({ selected: event.target.value });
  }

  submit(event) {
    if (this.state.selected !== defaultValue) {
      this.props.changeIndex(this.state.selected);
    }
  }

  renderOptions() {
    return this.state.options.map(
      address => {
        const cash_name = 'Cassa ' + address;
        return (
          <option key={address} value={address}>
            {cash_name}
          </option>
        );
      });
  }

  render() {
    return (
      <div className="col-md-5">
        <form className="form-inline">
          <select
            onChange={this.changeValue}
            className="form-control input-lg margin-top-10 margin-right-10"
            id="inlineFormCustomSelect">
            <option defaultValue value={defaultValue}>Scegli la postazione...</option>
            { this.renderOptions() }
          </select>

          <button
            onClick={this.submit}
            type="button"
            className="btn btn-primary btn-lg margin-top-10">
            Invia
          </button>
        </form>
      </div>
    );
  }
};

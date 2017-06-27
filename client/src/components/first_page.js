import React, { Component } from 'react';

const defaultValue = 'null';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.changeCashValue = this.changeCashValue.bind(this);
    this.changeTypeValue = this.changeTypeValue.bind(this);
    this.state = { options: [], cashSelected: defaultValue, typeSelected: defaultValue };
  }

  componentDidMount() {
    fetch('/addresses')
      .then(res => res.json())
      .then(addresses => this.setState({ options: addresses }));
  }

  changeCashValue(event) {
    this.setState({ cashSelected: event.target.value });
  }

  changeTypeValue(event) {
    this.setState({ typeSelected: event.target.value });
  }

  submit(event) {
    if (this.state.cashSelected !== defaultValue
      && this.state.typeSelected !== defaultValue) {
      this.props.changeAppInfo({
        cash_register: this.state.cashSelected,
        appType: this.state.typeSelected
      });
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
            onChange={this.changeCashValue}
            className="form-control input-lg margin-top-10 margin-right-10"
            id="inlineFormCustomSelect">
            <option defaultValue value={defaultValue}>Scegli la postazione...</option>
            { this.renderOptions() }
          </select>

          <select
            onChange={this.changeTypeValue}
            className="form-control input-lg margin-top-10 margin-right-10"
            id="inlineFormCustomSelect">
            <option defaultValue value={defaultValue}>Cucina o stand?</option>
            <option value="cucina">Cucina</option>
            <option value="stand">Stand</option>
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

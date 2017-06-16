import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import utils from '../utils/utils';

import { modifyItem } from '../actions/actions_order';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = { quantity: 0, saveBtnEnabled: false, addList: [], removeList: [], add: [], remove: [] };
    this.changeQuantity = this.changeQuantity.bind(this);
    this.fetchAllIngredients = this.fetchAllIngredients.bind(this);
    this.fetchIngredientsByDishId = this.fetchIngredientsByDishId.bind(this);
    this.selectAddIngredient = this.selectAddIngredient.bind(this);
    this.restoreState = this.restoreState.bind(this);

    this.renderSelect = this.renderSelect.bind(this);
    this.renderAdd = this.renderAdd.bind(this);
    this.renderRemove = this.renderRemove.bind(this);
  }

  componentDidMount() {
    this.fetchAllIngredients();
  }

  componentWillReceiveProps(props1) {
    if (typeof props1.order[props1.currentReceiptLine] !== 'undefined') {
      if (props1.currentReceiptLine !== this.props.currentReceiptLine) {
        this.restoreState();
      }

      const id = props1.order[props1.currentReceiptLine].id;
      this.fetchIngredientsByDishId(id);
    }
  }

  restoreState() {
    this.setState({ quantity: 0, saveBtnEnabled: false, add: [], remove: [] });
  }

  selectAddIngredient(event, ing) {
    const index = this.state.add.indexOf(ing);
    var add = this.state.add.map(_ing => { return _ing; });
    index === -1 ? add.splice(0, 0, ing) : add.splice(index, 1);

    const saveBtnEnabled =
      (this.state.quantity > 0 || add.length > 0 || this.state.remove.length > 0)
      && this.props.currentReceiptLine > -1;

    this.setState({
      saveBtnEnabled,
      add
    });
  }

  selectRemoveIngredient(event, ing) {
    const index = this.state.remove.indexOf(ing);
    var remove = this.state.remove.map(_ing => { return _ing; });
    index === -1 ? remove.splice(0, 0, ing) : remove.splice(index, 1);

    const saveBtnEnabled =
      (this.state.quantity > 0 || remove.length > 0 || this.state.add.length > 0)
      && this.props.currentReceiptLine > -1;

    this.setState({
      saveBtnEnabled,
      remove
    });
  }

  changeQuantity(event) {

    const newQuantity = parseInt(event.target.value, 10);

    const saveBtnEnabled = ((utils.isInt(newQuantity) && newQuantity > 0)
      || (this.state.add.length > 0 || this.state.remove > 0))
      && this.props.currentReceiptLine > -1;

    if (utils.isInt(newQuantity)) {
      this.setState({
        quantity: newQuantity,
        saveBtnEnabled
      });
    } else {
      this.setState({
        quantity: 0,
        saveBtnEnabled
      });
    }
  }

  fetchAllIngredients() {
    fetch('/ingredients')
      .then(res => res.json())
      .then(ing => this.setState({
        quantity: this.state.quantity,
        addList: ing,
        removeList: this.state.removeList,
        add: this.state.add,
        remove: this.state.remove
      }));
  }

  fetchIngredientsByDishId(id) {
    fetch(`/ingredients?dishid=${id}`)
      .then(res => res.json())
      .then(ing => this.setState({
        quantity: this.state.quantity,
        addList: this.state.addList,
        removeList: ing,
        add: this.state.add,
        remove: this.state.remove
      }));
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

  renderAdd() {
    return (
      <div className="button-group add-button-group">
        <button
          type="button"
          className="btn btn-default btn-lg dropdown-toggle add-modal-button"
          >Aggiungi... <span className="caret"></span></button>
        <ul className="dropdown-menu add-menu" id="add-menu">
        {
          this.state.addList.map(ing => {
            const checked = parseInt(this.state.add.indexOf(ing.name), 10) !== -1;
            return (
              <li
                onClick={(event) => this.selectAddIngredient(event, ing.name)}
                key={ing.id}
                className="cursor-pointer">
                <a data-value={ing.id} tabIndex="-1">
                  <input type="checkbox" checked={checked}/>
                  <h4>&nbsp;{ing.name}</h4>
                </a>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }

  renderRemove() {
    return (
      <div className="button-group remove-button-group" id="last-button-group">
        <button
          type="button"
          className="btn btn-default btn-lg dropdown-toggle remove-modal-button"
          >Togli... <span className="caret"></span></button>
        <ul className="dropdown-menu remove-menu" id="remove-menu">
        {
          this.state.removeList.map(ing => {
            const checked = parseInt(this.state.remove.indexOf(ing.name), 10) !== -1;
            return (
              <li
                key={ing.id}
                className="cursor-pointer"
                onClick={(event) => this.selectRemoveIngredient(event, ing.name)}>
                <a data-value={ing.id} tabIndex="-1">
                  <input type="checkbox" checked={checked}/>
                  <h4>&nbsp;{ing.name}</h4>
                </a>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }

  render() {
    const saveBtnClass = this.state.saveBtnEnabled ? 'btn btn-primary' : 'btn btn-primary disabled';
    const finalQuantity = this.state.quantity === 0 ? 1 : this.state.quantity;
    return (
      <div className="modal fade" id={this.props.idModal} role="dialog">
        <div className="modal-dialog modal-lg">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" id="modal-close" data-dismiss="modal"
                onClick={() => this.restoreState()}>&times;</button>
              <h4 className="modal-title">Modifica ordine (riga {parseInt(this.props.currentReceiptLine, 10) + 1})</h4>
            </div>
            <div className="modal-body">
              <form className="form-inline my-modal-form">
                { this.renderSelect() }
                { this.renderAdd() }
                { this.renderRemove() }
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className={saveBtnClass}
                id="modal-submit"
                data-dismiss="modal"
                onClick={() => this.props.modifyItem(this.props.currentReceiptLine,
                                      finalQuantity,
                                      this.state.add,
                                      this.state.remove)}>Salva</button>
              <button
                type="button"
                className="btn btn-default"
                id="modal-dismiss"
                data-dismiss="modal"
                onClick={() => this.restoreState()}>Annulla</button>
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
  return bindActionCreators({ modifyItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

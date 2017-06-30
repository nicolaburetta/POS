import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { resetQuantity } from '../actions/actions_quantity';
import { selectDish } from '../actions/actions_order';
import { changeLine } from '../actions/actions_receipt';

class DishesList extends Component {
  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
    this.renderDishesList = this.renderDishesList.bind(this);
    this.state = { items: [] };
  }

  componentDidMount() {
    if (this.props.type.toLowerCase() === 'cucina') {
      fetch('/dishes')
        .then(res => res.json())
        .then(dishes => {
          var items = this.state.items;
          dishes.map(dish => {
            if ( typeof items[dish.type_id - 1] === 'undefined' ) {
              items[dish.type_id - 1] = {
                type: {
                  id: dish.type_id,
                  name: dish.type_name
                },
                dishes: [{
                  id: dish.dish_id,
                  name: dish.dish_name,
                  price: dish.dish_price
                }]
              };
            } else {
              items[dish.type_id - 1].dishes.push({
                id: dish.dish_id,
                name: dish.dish_name,
                price: dish.dish_price
              });
            }
            return true;
          });
          this.setState({ items });
        });
    } else if (this.props.type.toLowerCase() === 'stand') {
      fetch('/drinks')
        .then(res => res.json())
        .then(drinks => {
          var items = this.state.items;
          const birra = 10;
          const spritzL = 11, spritzM = 12;
          const cocktail = 13;
          const altro = 14;
          drinks.map(drink => {
            var my_case, case_name;
            if (drink.drink_name.toLowerCase().includes('birra')) {
              my_case = birra;
              case_name = 'Birra';
            } else if (drink.drink_name.toLowerCase().includes('spritz m')) {
              my_case = spritzM;
              case_name = 'Spritz Macchiato';
            } else if (drink.drink_name.toLowerCase().includes('spritz l')) {
              my_case = spritzL;
              case_name = 'Spritz Liscio';
            } else if (drink.drink_name.toLowerCase().includes('cocktail')) {
              my_case = cocktail;
              case_name = 'Cocktail';
            } else {
              my_case = altro;
              case_name = 'Altro';
            }

            if (typeof items[my_case] === 'undefined') {
              items[my_case] = {
                type: {
                  id: my_case,
                  name: case_name
                },
                drinks: [{
                  id: drink.drink_id,
                  name: drink.drink_name,
                  price: drink.drink_price
                }]
              };
            } else {
              items[my_case].drinks.push({
                id: drink.drink_id,
                name: drink.drink_name,
                price: drink.drink_price
              });
            }
            return true;
          });
          this.setState({ items });
        });
    }
  }

  selectItem(dish) {
    console.log(dish);
    this.props.selectDish(dish, this.props.currentQuantity, [], []);
    this.props.resetQuantity();
    this.props.changeLine(this.props.order.length);
  }

  renderDishesList(item) {
    if (this.props.type.toLowerCase() === 'cucina') {
      return item.dishes.map(dish => {
        const obj = {
          type_id: item.type.id,
          id: dish.id,
          name: dish.name,
          price: dish.price
        };

        return (
          <li
            className="list-group-item cursor-pointer"
            key={dish.id}
            value={dish.name}
            onClick={() => this.selectItem(obj)}>
            <h4>
              {dish.name}
            </h4>
          </li>
        );
      });
    } else if (this.props.type.toLowerCase() === 'stand') {
      return item.drinks.map(drink => {
        const obj = {
          type_id: item.type.id,
          id: drink.id,
          name: drink.name,
          price: drink.price
        };

        return (
          <li
            className="list-group-item cursor-pointer"
            key={drink.id}
            value={drink.name}
            onClick={() => this.selectItem(obj)}>
            <h4>
              {drink.name}
            </h4>
          </li>
        );
      });
    }
  }

  renderList(items) {
    var dataparent = '#drinks-list';
    if (this.props.type.toLowerCase() === 'cucina') { dataparent = '#dishes-list'; }
    return items.map(item => {
      const collapse = `collapse${item.type.id}`;
      const panel_collapse = `panel-${collapse}`;
      const id_collapse = `#${collapse}`;
      return (
        <div key={item.type.id} className="panel panel-default">
          <div className="panel-heading cursor-pointer"
            id={panel_collapse}
            data-toggle="collapse"
            data-target={id_collapse}
            data-parent={dataparent}>
            <h2 className="panel-title">
              { item.type.name }
            </h2>
          </div>
          <div id={collapse} className="panel-collapse collapse">
            <ul className="list-group">
              { this.renderDishesList(item) }
            </ul>
          </div>
        </div>
      );
    });
  }

  render() {
    var div_id = 'drinks-list';
    if (this.props.type.toLowerCase() === 'cucina') { div_id = 'dishes-list'; }
    return (
      <div className="panel-group noselect" id={div_id}>
        { this.renderList(this.state.items) }
      </div>
    );
  }
}

function mapStateToProps({ order, currentQuantity }) {
  return { order, currentQuantity };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ resetQuantity, selectDish, changeLine }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DishesList);

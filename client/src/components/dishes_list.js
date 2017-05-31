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
  }

  selectItem(dish) {
    this.props.selectDish(dish, this.props.currentQuantity, [], []);
    this.props.resetQuantity();
    this.props.changeLine(this.props.order.length);
  }

  renderDishesList(dishes) {
    return dishes.map(dish => {
      return (
        <li
          className="list-group-item cursor-pointer"
          key={dish.id}
          value={dish.name}
          onClick={() => this.selectItem(dish)}>
          <h4>
            {dish.name}
          </h4>
        </li>
      );
    });
  }

  renderList(items) {
    return items.map(item => {
      const collapse = `collapse${item.type.id}`;
      const id_collapse = `#${collapse}`;
      const dishes = item.dishes;
      return (
        <div key={item.type.id} className="panel panel-default">
          <div className="panel-heading cursor-pointer"
            data-toggle="collapse"
            data-target={id_collapse}
            data-parent="#dishes-list">
            <h2 className="panel-title">
              { item.type.name }
            </h2>
          </div>
          <div id={collapse} className="panel-collapse collapse">
            <ul className="list-group">
              { this.renderDishesList(dishes) }
            </ul>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="panel-group noselect" id="dishes-list">
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectDish } from '../actions/index';

class DishesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      dishSelected: {}
    };

    this.onItemSelected = this.onItemSelected.bind(this);
  }

  componentDidMount() {
    const url = `/dishes?typeid=${this.props.typeId}`;
    fetch(url)
      .then(res => res.json())
      .then(dishes => this.setState({ dishes }));
  }

  onItemSelected(dish) {
    this.props.selectDish(dish);
  }

  renderList() {
    return this.state.dishes.map(dish => {
      return (
        <li
          className="list-group-item cursor-pointer"
          key={ dish.id }
          value={dish.name}
          onClick={() => this.onItemSelected(dish)}>
          { dish.name }
        </li>
      );
    });
  }

  render() {
    const collapse = `collapse${this.props.typeId}`;
    const id_collapse = `#${collapse}`;
    return (
      <div className="panel panel-default">
        <div className="panel-heading cursor-pointer"
          data-toggle="collapse"
          data-target={id_collapse}
          data-parent="#dishes-list">
          <h4 className="panel-title">
            {this.props.typeName}
          </h4>
        </div>
        <div id={collapse} className="panel-collapse collapse">
          <ul className="list-group">
            { this.renderList() }
          </ul>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectDish }, dispatch);
}

export default connect(null, mapDispatchToProps)(DishesListItem);

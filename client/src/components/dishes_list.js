import React, { Component } from 'react';
import DishesListItem from './dishes_list_item';

export default class DishesList extends Component {
  constructor(props) {
    super(props);

    this.state = { types: [] }
  }

  componentDidMount() {
    fetch('/dishestypes')
      .then(res => res.json())
      .then(types => this.setState({ types }));
  }

  renderList() {
    return this.state.types.map(type => {
      return (
        <DishesListItem
          key={type.id}
          typeId={type.id}
          typeName={type.name}
          quantity={this.props.quantity}
          onChangeQuantity={this.props.onChangeQuantity} />
      );
    });
  }

  render() {
    return (
      <div className="panel-group noselect" id="dishes-list">
        { this.renderList() }
      </div>
    );
  }
};

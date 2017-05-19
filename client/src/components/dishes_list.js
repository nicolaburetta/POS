import React, { Component } from 'react';
import DishesListItem from './dishes_list_item';

export default class DishesList extends Component {
  state = { types: [] }

  componentDidMount() {
    fetch('/dishes-types')
      .then(res => res.json())
      .then(types => this.setState({ types }));
  }

  renderList() {
    return this.state.types.map(type => {
      return (
        <DishesListItem key={type.id} typeId={type.id} typeName={type.name} />
      );
    });
  }

  render() {
    return (
      <div className="panel-group" id="dishes-list">
        { this.renderList() }
      </div>
    );
  }
};

import React, { Component } from 'react';

class DishesListItem extends Component {
  state = { dishes: [] };

  componentDidMount() {
    const url = `/dishes?typeid=${this.props.typeId}`;
    fetch(url)
      .then(res => res.json())
      .then(dishes => this.setState({ dishes }));
  }

  renderList() {
    return this.state.dishes.map(dish => {
      return (
        <li key={ dish.id } className="list-group-item">
          { dish.name }
        </li>
      );
    });
  }

  render() {
    const collapse = `collapse${this.props.typeId}`;
    const id_collapse = `#${collapse}`;
    return (
      <div className="panel-group">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" href={id_collapse}>{this.props.typeName}</a>
            </h4>
          </div>
          <div id={collapse} className="panel-collapse collapse">
            <ul className="list-group">
              { this.renderList() }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DishesListItem;

import React, { Component } from "react";

class TableHeader extends Component {
  state = {
    order: "asc",
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => {
            if (column) {
              return (
                <th
                  key={column.key}
                  onClick={() => this.handleSort(column.key)}
                  scope="col"
                  className="clickable"
                >
                  {column.label} {this.renderSortIcon(column)}
                </th>
              );
            }
          })}
        </tr>
      </thead>
    );
  }

  handleSort = (path) => {
    let orderResult = this.state.order;
    if (this.props.sortColumn.path === path) {
      orderResult = orderResult === "asc" ? "desc" : "asc";
    }
    this.setState({ order: orderResult });
    this.props.onSort({ path, order: orderResult });
  };

  renderSortIcon = (column) => {
    if (column) {
      const { sortColumn } = this.props;
      if (column.key !== sortColumn.path) return null;
      if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

      return <i className="fa fa-sort-desc"></i>;
    }
  };
}

export default TableHeader;

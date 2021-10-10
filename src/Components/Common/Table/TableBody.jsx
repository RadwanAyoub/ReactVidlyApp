import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { items, columns } = this.props;

    const result = items.map((item) => {
      return (
        <tr key={item._id}>
          {columns.map((column) => {
            if (column) {
              return <td key={column.key}>{this.renderCell(item, column)}</td>;
            }
          })}
        </tr>
      );
    });

    return <tbody>{result}</tbody>;
  }

  renderCell = (item, column) => {
    if (column) {
      if (column.content) {
        return column.content(item);
      }

      return _.get(item, column.key);
    }
  };
}

export default TableBody;

import React, { Component } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

class Table extends Component {
  render() {
    const { items, columns, onSort, sortColumn } = this.props;
    return (
      <table className="table table-striped table-dark border-warning">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody items={items} columns={columns} />
      </table>
    );
  }
}

export default Table;

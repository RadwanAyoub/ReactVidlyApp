import React, { Component } from "react";

class Statistics extends Component {
  state = {
    componentsCount: 2,
    moviesCount: 11,
    countersCount: 4,
  };
  
  render() {
    return (
      <div className="statistics pb-5">
        <figure>
          <blockquote className="blockquote">
            <h1 className="display-6">Statistics Component</h1>
          </blockquote>
          <figcaption className="blockquote-footer">
            Showing{" "}
            <span className="badge rounded-pill bg-primary">
              {this.state.componentsCount}
            </span>{" "}
            Component
          </figcaption>
        </figure>
        <table className="table table-striped table-dark border-warning">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Movies</th>
              <th scope="col">Counters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Count</th>
              <td>{this.state.moviesCount}</td>
              <td>{this.state.countersCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Statistics;

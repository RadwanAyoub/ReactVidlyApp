import React, { Component } from "react";
import { Minus, Plus, Trash } from "../Common/IconHelper";

class Counter extends Component {
  //   state = {
  //     value: this.props.counter.value,
  //     tags: ["tag1", "tag2", "tag3"],
  //   };

  render() {
    return (
      <div className="col-sm-6">
        <div className="card text-white bg-dark mb-3">
          <div className="card-body">
            <h5 className="card-title">{this.props.children}</h5>
            <p className="card-text">With supporting text below as</p>
            <button type="button" className={this.getButtonClasses()}>
              Count
              <span
                className={
                  "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-" +
                  this.getBadgeClasses()
                }
              >
                {this.formatCount()}
                <span className="visually-hidden">Count number</span>
              </span>
            </button>
            <button
              onClick={() => {
                this.props.onIncrement(this.props.counter);
              }}
              className="btn btn-outline-info btn-sm me-3"
            >
              <Plus />
            </button>
            <button
              onClick={() => {
                this.props.onDecrement(this.props.counter);
              }}
              className={`btn btn-outline-info btn-sm me-3${
                this.props.counter.value === 0 ? " disabled" : ""
              }`}
            >
              <Minus />
            </button>
            <Trash
              onDelete={this.props.onDelete}
              item={this.props.counter.id}
            />
          </div>
        </div>
      </div>
      //   {/* <section className="mt-5">
      //               {this.getTags()}
      //           </section> */}
    );
  }

  getTags() {
    if (this.props.counter.tags.length !== 0)
      return (
        <ul>
          {this.props.counter.map((tag) => (
            <li className="list-group-item" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      );
    else
      return (
        <div>
          <p>No TAGS found</p>
          <p>Please create a new tag</p>
        </div>
      );
  }

  getButtonClasses() {
    let btnClasses = "btn position-relative me-5 btn-outline-";
    btnClasses +=
      this.formatCount() === "Zero" ? "warning text-darky" : "primary";
    return btnClasses;
  }

  getBadgeClasses() {
    let badgeClassName = this.formatCount() === "Zero" ? "danger" : "success";
    return badgeClassName;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;

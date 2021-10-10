import React, { Component } from "react";
import Counter from "./Counter";

class Conters extends Component {
  state = {
    counters: [
      { id: 1, value: 7 },
      { id: 2, value: 192 },
      { id: 3, value: 0 },
      { id: 4, value: 56 },
    ],
  };

  render() {
    //Destructuring Argument
    const { counters } = this.state;
    return (
      <div className="pb-5">
        <h1 className="display-6">Counters Component</h1>
        <button
          type="button"
          onClick={this.handleReset}
          className="btn position-relative me-5 btn-danger"
        >
          Reset All Counters
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
            {counters.length}
            <span className="visually-hidden">Count number</span>
          </span>
        </button>
        <div className="row pt-3">
          {counters.map((counter) => (
            <Counter
              key={counter.id}
              counter={counter}
              onDelete={this.handleDelete}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
            >
              <h4 className="display-6">Counter #{counter.id}</h4>
            </Counter>
          ))}
        </div>
      </div>
    );
  }

  handleDelete = (counterId) => {
    const filteredCounters = this.state.counters.filter(
      (c) => c.id !== counterId
    );

    this.setState({ counters: filteredCounters });
  };

  handleReset = () => {
    const filteredCounters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });

    this.setState({ counters: filteredCounters });
  };

  handleIncrement = (counter) => {
    const filteredCounters = [...this.state.counters];
    const index = filteredCounters.indexOf(counter);
    filteredCounters[index] = { ...counter };
    filteredCounters[index].value++;
    this.setState({ counters: filteredCounters });
  };

  handleDecrement = (counter) => {
    const filteredCounters = this.state.counters.map((c) => {
      if (c.id === counter.id) {
        if (c.value > 0) c.value--;
      }
      return c;
    });
    this.setState({ counters: filteredCounters });
  };
}

export default Conters;

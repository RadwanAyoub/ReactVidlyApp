import React, { Component } from "react";
import Movies from "../Components/Movies/Movies";
import Statistics from "./Statistics";
import Counters from "../Components/Counter/Counters";
import { getMovies } from "../Services/MoviesService";
import auth from "../Services/UsersService";

class Homepage extends Component {
  movies = {};
  state = {
    counters: [
      { id: 1, value: 7 },
      { id: 2, value: 192 },
      { id: 3, value: 0 },
      { id: 4, value: 56 },
    ],
    componentsCount: 2,
  };

  async componentDidMount() {
    this.movies = await getMovies().length;
    const userData = auth.getCurrentUser();
    this.setState({ user: userData });
  }

  render() {
    return (
      <React.Fragment>
        <Movies user={this.state.user} />
        <Counters
          counters={this.state.counters}
          onReset={this.handleReset}
          onIncrement={this.handleIncrement}
          onDelete={this.handleDelete}
          onDecrement={this.handleDecrement}
        />
        <Statistics
          componentsCount={this.state.componentsCount}
          moviesCount={this.movies}
          countersCount={this.state.counters.length}
        />
      </React.Fragment>
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

export default Homepage;

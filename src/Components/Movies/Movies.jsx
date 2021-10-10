import React, { Component } from "react";
import { getGenres } from "../../Services/GenresService";
import {
  getPageSize,
  currentPage,
  currentFilter,
  getMovies,
  deleteMovie,
} from "../../Services/MoviesService";
import TextField from "@mui/material/TextField";
import SelectList from "../Common/SelectList";
import Pagination from "../Common/Pagination";
import { Filter, Sort } from "../Utils/Filter";
import { Paginate } from "../Utils/Paginate";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    currentPage: currentPage,
    currentFilter: currentFilter,
    movies: [],
    genres: [],
    moviesCount: 0,
    searchQuery: "",
    sortColumn: { path: "", order: "" },
  };

  async componentDidMount() {
    const movies = await getMovies();
    const genres = await getGenres();
    this.setState({
      movies,
      genres,
      moviesCount: movies.length,
      sortColumn: { path: "title", order: "asc" },
    });
  }

  render() {
    if (this.state.moviesCount === 0)
      return <h1 className="display-6">No Movies To Show</h1>;
    const moviesObject = this.getMoviesRender();
    const { user } = this.props;

    return (
      <div className="pb-5">
        <figure>
          <blockquote className="blockquote">
            <h1 className="display-6">Movies Component</h1>
          </blockquote>
          <figcaption className="blockquote-footer">
            Showing{" "}
            <span className="badge rounded-pill bg-primary">
              {moviesObject.count}
            </span>{" "}
            Movies
          </figcaption>
        </figure>
        <div className="row">
          <div className="col align-self-start">
            <SelectList
              items={this.state.genres}
              keyProperty="_id"
              valueProperty="name"
              onItemSelect={this.handleFilter}
            />
          </div>
          <div className="col align-self-middle">
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              className="p-0 m-0"
              onChange={this.handleSearch}
            />
          </div>
          {user && user.isAdmin && (
            <div className="col align-self-end">
              <Link to="/movies/new" className="btn btn-success mb-3 float-end">
                Create new movie
              </Link>
            </div>
          )}
        </div>
        {moviesObject.result.length > 0 ? (
          <div className="table-responsive">
            <MoviesTable
              movies={moviesObject.result}
              onDelete={this.handleMovieDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              pageSize={getPageSize}
              contentLength={moviesObject.count}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        ) : this.state.movies.length === 0 ? (
          <h1 className="display-6">No Movies To Show</h1>
        ) : (
          <h4>
            Based on the filter, no movies related to {this.state.currentFilter}
          </h4>
        )}
      </div>
    );
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFilter = (filter) => {
    this.setState({
      currentFilter: filter,
      currentPage: 1,
    });
  };

  handleSearch = ({ target }) => {
    const query = target.value;
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleMovieDelete = async (movieId) => {
    const originalMovies = this.state.movies;
    const filteredMovies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: filteredMovies, currentPage: 1 });
    try {
      await deleteMovie(movieId);

      toast.success(`Movie #${movieId} has been deleted`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error(`Movie #${movieId} not found`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const filteredMovies = this.state.movies.map((m) => {
      if (m._id === movie._id) {
        m.liked = !movie.liked;
      }
      return m;
    });
    this.setState({ movies: filteredMovies });
  };

  getMoviesRender() {
    let allMovies = this.state.movies;
    if (this.state.searchQuery) {
      allMovies = this.state.movies.filter((movie) => {
        return movie.title.toLowerCase().startsWith(this.state.searchQuery);
      });
    }
    const filteredMovies = Filter(allMovies, this.state.currentFilter, [
      "genre",
      "name",
    ]);

    const sortedMovies = Sort(
      filteredMovies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const resultMovies = Paginate(
      sortedMovies,
      this.state.currentPage,
      getPageSize
    );

    return { result: resultMovies, count: filteredMovies.length };
  }
}

export default Movies;

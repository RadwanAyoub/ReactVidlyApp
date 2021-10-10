import React from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Send, CompareArrowsOutlined } from "@material-ui/icons";
import Joi from "joi";
import Form from "./../Common/Forms/Form";
import { getGenreById, getGenres } from "../../Services/GenresService";
import { saveMovie, getMovie } from "./../../Services/MoviesService";

class MovieDetails extends Form {
  state = { data: {}, errors: {}, genres: [] };

  schema = Joi.object({
    _id: Joi.optional(),
    genre: Joi.optional(),
    genreName: Joi.optional(),
    genreId: Joi.string().required().label("Genre"),
    title: Joi.string().required().label("Name"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
    numberInStock: Joi.number().min(1).max(100).required().label("Stock"),
  });

  componentDidMount() {
    if (!this.props.match.params.id)
      return this.props.history.replace("/not-found");
    this.mapMovieFields(this.props.match.params.id).then((data) => {
      if (!data) return this.props.history.replace("/not-found");

      this.setState({ data });
    });

    getGenres().then((genres) => this.setState({ genres }));
  }

  render() {
    const { data, errors, genres } = this.state;
    return (
      <div className="row justify-content-md-center mb-5">
        <AppBar position="static" alignitems="center" color="secondary">
          <Toolbar>
            <Grid container justifyContent="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">
                  Movie <CompareArrowsOutlined /> {data.title}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className="mx-auto" style={{ width: "500px" }}>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={10}
              className="login-form"
            >
              <Paper
                variant="elevation"
                elevation={10}
                className="login-background"
              >
                <Grid item className="pb-5">
                  <Typography component="h1" variant="h3">
                    Update the movie
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.doSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          color="secondary"
                          type="text"
                          placeholder="Title"
                          fullWidth
                          name="title"
                          variant="standard"
                          value={data.title}
                          onChange={this.handleChange}
                          autoFocus
                        />
                        {errors.title && (
                          <div className="alert alert-danger">
                            {errors.title}
                          </div>
                        )}
                      </Grid>
                      <Grid item>
                        <FormControl
                          variant="standard"
                          color="secondary"
                          style={{ m: 1, minWidth: 200, width: "500px" }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Genres
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={data.genreId}
                            name="genreId"
                            onChange={this.handleSelectedValue}
                            label="Genres"
                          >
                            {genres.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {errors.genreId && (
                          <div className="alert alert-danger">
                            {errors.genreId}
                          </div>
                        )}
                      </Grid>
                      <Grid item>
                        <TextField
                          color="secondary"
                          type="number"
                          placeholder="Number in stock"
                          fullWidth
                          name="numberInStock"
                          variant="standard"
                          value={data.numberInStock}
                          onChange={this.handleChange}
                        />
                        {errors.numberInStock && (
                          <div className="alert alert-danger">
                            {errors.numberInStock}
                          </div>
                        )}
                      </Grid>
                      <Grid item>
                        <TextField
                          color="secondary"
                          type="number"
                          placeholder="Daily Rental Rate"
                          fullWidth
                          name="dailyRentalRate"
                          variant="standard"
                          className="mb-3"
                          value={data.dailyRentalRate}
                          onChange={this.handleChange}
                        />
                        {errors.dailyRentalRate && (
                          <div className="alert alert-danger">
                            {errors.dailyRentalRate}
                          </div>
                        )}
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="secondary"
                          type="submit"
                          fullWidth
                          onChange={this.handleChange}
                          endIcon={<Send />}
                        >
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
              <button className="btn btn-warning" onClick={this.handleBack}>
                Go Back
              </button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  handleSelectedValue = async (event) => {
    this.handleChange(event);
    const data = { ...this.state.data };
    data.genreId = event.target.value;
    const { data: genre } = await getGenreById(data.genreId);
    data.genre = genre;

    this.setState({ data });
  };

  async mapMovieFields(id) {
    const data = await getMovie(id);
    if (data) {
      return {
        _id: data._id,
        genre: data.genre,
        genreId: data.genre._id,
        genreName: data.genre.name,
        title: data.title,
        numberInStock: data.numberInStock,
        dailyRentalRate: data.dailyRentalRate,
      };
    }
    return data;
  }

  handleBack = () => {
    this.props.history.push("/movies");
  };

  doSubmit = async (event) => {
    if (this.handleSubmit(event)) {
      await saveMovie(this.state.data);
      this.props.history.push("/movies");
    }
  };
}

export default MovieDetails;

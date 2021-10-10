import React, { Component } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { Link as RouteLink } from "react-router-dom";
import Joi from "joi";
import auth from "../../../Services/UsersService";
import { Redirect } from "react-router";

class LoginForm extends Component {
  //username = React.createRef();
  //password = React.createRef();
  //this.username.current.value; - to get the value of input by react ref - minimize the usage of refs
  //this.password.current.value;

  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string().required().label("username"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .label("password"),
  });

  componentDidMount() {
    //this.username.current.focus(); - apply focus to an input
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    const { data, errors } = this.state;
    return (
      <div className="row justify-content-md-center">
        <AppBar position="static" alignitems="center" color="secondary">
          <Toolbar>
            <Grid container justifyContent="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">Login Form</Typography>
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
                    Sign in
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.doSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          color="secondary"
                          type="email"
                          placeholder="Email"
                          fullWidth
                          name="email"
                          variant="standard"
                          helperText="Email should contain @ symbole"
                          value={data.email}
                          onChange={this.handleChange}
                          autoFocus
                        />
                        {errors.email && (
                          <div className="alert alert-danger">
                            {errors.email}
                          </div>
                        )}
                      </Grid>
                      <Grid item>
                        <TextField
                          color="secondary"
                          type="password"
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="standard"
                          helperText=""
                          className="mb-3"
                          value={data.password}
                          onChange={this.handleChange}
                        />
                        {errors.password && (
                          <div className="alert alert-danger">
                            {errors.password}
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
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item className="pt-2">
                  <RouteLink
                    to="/forgot-password"
                    variant="body2"
                    className="text-info"
                  >
                    Forgot Password?
                  </RouteLink>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  validateProperty = ({ value, name }) => {
    const property = { [name]: value };
    const schema = Joi.object({
      [name]: this.schema.extract([name]),
    });
    const { error } = schema.validate(property);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = { ...this.state.errors };
    error.details.map((item) => {
      return (errors[item.path[0]] = item.message);
    });

    this.setState({
      errors: errors || {},
    });
    return errors;
  };

  handleChange = ({ target }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const validation = this.validateProperty(target);

    data[target.name] = target.value;
    if (validation !== null) {
      errors[target.name] = validation;
    } else {
      errors[target.name] = "";
    }

    this.setState({
      data,
      errors,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const validation = this.validate();
    if (validation !== null) return false;

    return true;
  };

  doSubmit = async (event) => {
    if (this.handleSubmit(event)) {
      const { data, errors } = this.state;
      try {
        await auth.loginUser(data);
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/";
      } catch (ex) {
        console.log(ex);
        if (ex.response && ex.response.status === 400) {
          const errorsList = { ...errors };
          errorsList.email = ex.response.data;
          this.setState({ errors: errorsList });
        }
      }
    }
  };
}
export default LoginForm;

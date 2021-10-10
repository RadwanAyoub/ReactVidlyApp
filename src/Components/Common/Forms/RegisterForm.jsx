import React from "react";
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
import Joi from "joi";
import Form from "./Form";
import auth from "../../../Services/UsersService";

class RegisterForm extends Form {
  //username = React.createRef();
  //password = React.createRef();
  //this.username.current.value; - to get the value of input by react ref - minimize the usage of refs
  //this.password.current.value;

  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    name: Joi.string().min(5).max(15).required().label("Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .label("password"),
  });

  componentDidMount() {
    //this.username.current.focus(); - apply focus to an input
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div className="row justify-content-md-center">
        <AppBar position="static" alignitems="center" color="secondary">
          <Toolbar>
            <Grid container justifyContent="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">Register Form</Typography>
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
                    Register
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.doSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          color="secondary"
                          type="text"
                          placeholder="User Name"
                          fullWidth
                          name="name"
                          variant="standard"
                          value={data.name}
                          onChange={this.handleChange}
                          autoFocus
                        />
                        {errors.name && (
                          <div className="alert alert-danger">
                            {errors.name}
                          </div>
                        )}
                      </Grid>
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
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  doSubmit = async (event) => {
    if (this.handleSubmit(event)) {
      try {
        await auth.registerUser(this.state.data);
        window.location = "/";
      } catch (ex) {
        console.log(ex);
        if (ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.name = ex.response.data;
          this.setState({ errors });
        }
      }
    }
  };
}

export default RegisterForm;

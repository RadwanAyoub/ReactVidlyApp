import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import "./App.css";
import Footer from "./Components/Global/Footer";
import Navbar from "./Components/Global/Navbar";
import Movies from "./Components/Movies/Movies";
import Statistics from "./Components/Statistics";
import Counters from "./Components/Counter/Counters";
import Homepage from "./Components/Homepage";
import MovieDetails from "./Components/Movies/MovieDetails";
import NotFound from "./Components/NotFound";
import LoginForm from "./Components/Common/Forms/LoginForm";
import ForgotPassword from "./Components/Common/Forms/ForgotPassword";
import RegisterForm from "./Components/Common/Forms/RegisterForm";
import CreateMovieForm from "./Components/Movies/CreateMovieForm";
import { ToastContainer } from "react-toastify";
import auth from "./Services/UsersService";
import ProtectedRoute from "./Components/Common/ProtectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const userData = auth.getCurrentUser();
    this.setState({ user: userData });
  }

  render() {
    console.log(process.env);
    return (
      <React.Fragment>
        <Navbar user={this.state.user} />
        <main className="container">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Switch>
            <ProtectedRoute path="/movies/new" component={CreateMovieForm} />
            <ProtectedRoute path="/movies/:id" component={MovieDetails} />
            <ProtectedRoute path="/create-movie" component={CreateMovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies user={this.state.user} {...props} />}
            />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/counters" component={Counters} />
            <Route path="/Statistics" component={Statistics} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Homepage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

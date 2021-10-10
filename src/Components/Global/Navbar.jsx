import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import auth from "../../Services/UsersService";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark mb-5">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Custom App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <ul className="navbar-nav d-flex flex-row me-1">
              <li className="nav-item me-3 me-lg-0">
                <NavLink to="/movies" className="nav-link" href="#">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item me-3 me-lg-0">
                <NavLink to="/counters" className="nav-link" href="#">
                  Counters
                </NavLink>
              </li>
              <li className="nav-item me-3 me-lg-0">
                <NavLink to="/statistics" className="nav-link" href="#">
                  Statistics
                </NavLink>
              </li>
              <li className="nav-item me-3 me-lg-0">
                <form className="w-auto pe-5">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
              </li>
              {this.props.user ? (
                <React.Fragment>
                  <li className="nav-item me-1">
                    <Link className="nav-link" to="/profile">
                      {this.props.user.name}
                    </Link>
                  </li>
                  <li
                    className="nav-item me-3 nav-link"
                    onClick={this.logoutUser}
                  >
                    <span>
                      <ExitToApp />
                    </span>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item me-3">
                    <Link className="nav-link" to="/register">
                      <i className="fa fa-registered"></i>
                    </Link>
                  </li>
                  <li className="nav-item me-3">
                    <Link className="nav-link" to="/login">
                      <i className="fa fa-address-card"></i>
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  logoutUser = () => {
    auth.logout();
    window.location = "/";
  };
}

export default Navbar;

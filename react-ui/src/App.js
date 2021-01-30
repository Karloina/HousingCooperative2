import React, { Component } from "react";
import UserPage from "./components/Users/UserPage";
import ApartmentPage from "./components/Apartments/ApartmentPage";
import BlockPage from "./components/Blocks/BlockPage";
import BillPage from "./components/Bills/BillPage";
import ErrorBoundary from "./error-boundary/MyErrorBoundary";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login/Login2";
import Navbar from "./nav-old";
import "./Style/index.css";
import { _fetchData } from "./components/helpers";
import Landing from "./components/landing";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: "",
      // loggedIn: false,
      username: "",
      password: "",
      records: true,
      doctors: true,
      pharmacy: true,
      lab: true,
      insurance: true,
      account: true,
      admin: true,
      users: [],
      isOpen: false,
      isLoading: true
      // landing: true,
    };
  }

  componentWillMount() {
    
  }


  componentDidMount() {
    let user = localStorage.getItem("user");
    console.log(user);
    this.setState({ user });
    

    // if(user)
    // this.fetchUsers();
  }

  //Get all the users from the database
  fetchUsers = () => {
    const cb = data => this.setState({ users: data });
    _fetchData({ route: "users/usersList", callback: cb });
  };

  /**
   * The username and password validation for the login
   * is done with the handleLogin method
   */
  handleLogin = e => {
    e.preventDefault();

    if (this.state.username === "" || this.state.password === "") {
      return this.setState({ msg: "Please enter your username and password!" });
    } else {
      // const users = this.state.users;
      const username = this.state.username.trim();
      const password = this.state.password.trim();

      if (username === "user" && password === "user") {
        localStorage.setItem("user", this.state.username);

        this.setState(prevState => ({
          // loggedIn: true,
          records: true,
          doctors: true,
          pharmacy: true,
          lab: true,
          admin: true,
          profile: true,
          user: prevState.username
        }));
        // localStorage.setItem('user', this.state.username);
      } else {
        this.setState({
          msg: "You have entered wrong username or password"
        });
      }
    }
  };


  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
    this.setState({ msg: "" });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
    this.setState({ msg: "" });
  };

  logout = () => {
    const user = localStorage.getItem("username");
    this.setState({ loggedIn: false, username: "" });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleLanding = () => this.setState({ landing: false });

  render() {
    let hasAdminRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("administrator") > -1;
    let hasUserRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("user") > -1;
    let hasManagerRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("manager") > -1;
    return (
      <ErrorBoundary>
        {/* Conditional rendering which check if the user is a valid user or not */}
        {!this.state.user && (
          <Login
            handleLogin={this.handleLogin}
            message={this.state.msg}
            username={this.state.username}
            handleUsernameChange={this.handleUsernameChange}
            password={this.state.password}
            handlePasswordChange={this.handlePasswordChange}
          />
        )}
        

        {this.state.user && (
          <Router basename={process.env.PUBLIC_URL}>
            <div>
              {/* The header goes here */}
              <Navbar
                records={this.state.records}
                doctors={this.state.doctors}
                pharmacy={this.state.pharmacy}
                lab={this.state.lab}
                account={this.state.account}
                admin={this.state.admin}
                insurance={this.state.insurance}
                username={this.state.username}
                toggleLanding={this.toggleLanding}
              />
              <br />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" component={Landing} />
                {hasAdminRole && (
                <Route exact path="/users" component={UserPage} /> )}
                {hasAdminRole && (
                <Route exact path="/apartments" component={ApartmentPage} /> )}
                {hasAdminRole && (
                <Route exact path="/blocks" component={BlockPage} /> )}
                <Route exact path="/bills" component={BillPage} />
                <Route component={PageNotFound} /> 
              </Switch>
            </div>
          </Router>
        )}
        <div className="row">
          <span
            className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
            style={{ fontFamily: "cursive" }}
          ></span>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

function PageNotFound() {
  return <h1 style={{ textAlign: "center", marginTop: 40 }}>Page not found</h1>;

}

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from "reactstrap";
import logo from "./images/logo.png";
import i18n from './i18n';
import { _fetchData } from "./components/helpers";

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
}

export default class NavbarNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isProfileOpen: false,
      cl:""
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.props.toggleLanding();
  };

  logout = () => {
      window.keycloak.logout("/");
      let route = 'users/logout';
      let route2 = 'bills/logout';
      let success_callback = data => this.setState({ cl: data });
      let error_callback = error => this.setState({ error });
      _fetchData({ route, success_callback, error_callback });
      _fetchData({ route2, success_callback, error_callback });
  };

  render() {
    let hasAdminRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("administrator") > -1;
    let hasUserRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("user") > -1;
    let hasManagerRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("manager") > -1;

    return (
      <Navbar 
        dark 
        expand="md"
        style={{
          minHeight: '50px',
          padding: 0,
          margin: 0,
          paddingRight: 5,
          backgroundColor: '#0069D9',
        }}
      >
        <NavbarBrand href="http://192.168.8.34:3000/home" >
          <img src={logo} alt="logo" height="44"
            width="50"
            style={{
              margin: '0 20px',
            }} 
          />
          {/* <h4 className="logoText">HMS</h4> */}
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <div>
            <button onClick={() => changeLanguage('pl')}>pl</button>
            <button onClick={() => changeLanguage('en')}>en</button>
            <button onClick={() => changeLanguage('jp')}>jp</button>
          </div>
          <div style={{marginLeft: "1em", color: "white"}}>
          <span>{i18n.t('hello')}, {window.keycloak.tokenParsed.preferred_username}</span>
          </div>
          <Nav className="ml-auto" navbar>
            {hasAdminRole && (
              <NavItem onClick={this.toggle} style={{marginTop: "5px"}}>
                <NavLink to="/users" className="nav">
                {i18n.t('users')}
                </NavLink>
              </NavItem>
            )}
            {hasAdminRole && (
              <NavItem onClick={this.toggle} style={{marginTop: "5px"}}>
                <NavLink to="/apartments" className="nav">
                {i18n.t('apartments')}
                </NavLink>
              </NavItem>
            )}
            {hasAdminRole && (
              <NavItem onClick={this.toggle} style={{marginTop: "5px"}}>
                <NavLink to="/blocks" className="nav">
                {i18n.t('blocks')}
                </NavLink>
              </NavItem>
            )}
            <NavItem onClick={this.toggle} style={{marginTop: "5px"}}>
              <NavLink to="/bills" className="nav">
              {i18n.t('bills')}
              </NavLink>
            </NavItem>
            <NavItem>
              <Button color="danger" onClick={this.logout}>
              {i18n.t('logout')}
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

import React from 'react';
import image from '../../images/house-login-icon.png';
import './login2.css';

const Login = props => {
  return (
    <div className="wrapper">
      <div id="formContent">
        {/* <!-- Tabs Titles --> */}
        <h2 className="title" style={{ color: 'black'}}> Housing Cooperative </h2>

        {/* <!-- Icon --> */}
        <div className="first">
          <img
            src={image}
            id="icon"
            alt="House Icon"
            style={{ borderRadius: '50%' }}
          />
        </div>

        {/* <!-- Login Form --> */}
        <form onSubmit={props.handleLogin}>
          <input
            type="text"
            id="login"
            className="second username"
            placeholder="username"
            onChange={props.handleUsernameChange}
            value={props.username}
          />
          <input
            type="password"
            id="password"
            className="third password"
            placeholder="password"
            onChange={props.handlePasswordChange}
            value={props.password}
          />
          <input type="submit" className="fourth customBtn" value="Login" />
          <label style={{ color: 'red' }}>{props.message}</label>
        </form>
        <div id="form-footer">
          <div>
            username: user,
            password: user
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

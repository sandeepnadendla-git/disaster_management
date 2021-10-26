import { render } from '@testing-library/react';
import React, { Component } from 'react'
import "./Login.css";


class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }



  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.username == "Group2@nwmissouri.edu" && this.state.password === "Pass") {
      console.log("jhugytfrdtyfy")

      this.props.history.push('/dashboard');
    }
    else if (this.state.username !== "new@nwmissouri.edu" && this.state.password !== "password") {
      alert("Incorrect Username and password");
    }
    else {
      alert("Login Successfull");
    }
    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }


  render() {
    return (

      <div className="loginpageouter">
        <div class="login-wrap">
          <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label for="tab-1" class="tab" >Sign In</label>
            <input id="tab-2" type="radio" name="tab" class="sign-up" /><label for="tab-2" class="tab">Sign Up</label>
            <div class="login-form">
              <form onSubmit={this.handleSubmit}>
                {
                  this.state.error &&
                  <h3 data-test="error" onClick={this.dismissError}>
                    <button onClick={this.dismissError}>✖</button>
                    {this.state.error}
                  </h3>
                }
                <div class="sign-in-htm">
                  <div class="group">
                    <label for="user" class="label">Username</label>
                    <input id="user" type="text" name="username" class="input" data-test="username" value={this.state.username} onChange={this.handleUserChange} required />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Password</label>
                    <input id="pass" type="password" class="input" data-type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} required />
                  </div>
                  <div class="group">
                    <input id="check" type="checkbox" class="check" />
                    <label for="check"><span class="icon"></span> Keep me Signed in</label>
                  </div>
                  <div class="group">
                    <input type="submit" class="button" value="Sign In" />
                  </div>
                  <div class="hr"></div>
                  <div class="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                  </div>
                </div>
              </form>
              <form>
                <div class="sign-up-htm">
                  <div class="group">
                    <label for="user" class="label">Username</label>
                    <input id="user" type="text" class="input" required />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Password</label>
                    <input id="pass" type="password" class="input" data-type="password" required />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Repeat Password</label>
                    <input id="pass" type="password" class="input" data-type="password" required />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Email Address</label>
                    <input id="pass" type="text" class="input" required />
                  </div>
                  <div class="group">
                    <input type="submit" class="button" value="Sign Up" />
                  </div>
                  <div class="hr"></div>
                  <div class="foot-lnk">
                    <label for="tab-1">Already Member?</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogIn

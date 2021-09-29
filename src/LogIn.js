import React, { Component } from 'react'
import "./Login.css"

class LogIn extends Component {
  render() {
    return (

      <div class="login-wrap">
        <div class="login-html">
          <input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label for="tab-1" class="tab" >Sign In</label>
          <input id="tab-2" type="radio" name="tab" class="sign-up" /><label for="tab-2" class="tab">Sign Up</label>
          <div class="login-form">
            <form>
              <div class="sign-in-htm">
                <div class="group">
                  <label for="user" class="label">Username</label>
                  <input id="user" type="text" class="input" required />
                </div>
                <div class="group">
                  <label for="pass" class="label">Password</label>
                  <input id="pass" type="password" class="input" data-type="password" required />
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

    )
  }
}

export default LogIn

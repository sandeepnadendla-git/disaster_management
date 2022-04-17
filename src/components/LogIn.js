//import { render } from '@testing-library/react';
import React, { Component } from 'react'
import "../css/Login.css";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { analytics } from "../firebase.js";
import { collection, addDoc, Firestore, setDoc, Timestamp } from "firebase/firestore";

class LogIn extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    document.cookie="ls=0";

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.save = this.save.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    
    var user2 = {
      "email": this.state.username,
      "password": this.state.password

    }
   
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user2.email, user2.password)
      .then((userCredential) => {
        // Signed in 
        document.cookie = "ls=1";
        console.log(userCredential);
        const user = userCredential.user.firstName != null ? userCredential.user.firstName : userCredential.user.email;
        localStorage.setItem("userDetails", JSON.stringify(user));
        console.log(user);
        this.props.history.push('/dashboard');
        // ...
      })
      .catch((error) => {
        document.cookie="ls=0";
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
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

  save(e) {
    e.preventDefault();
    if (document.getElementById('savepass').value != document.getElementById('saverpass').value) {
      alert("Password and repeat password doesn't match");
    } else {
      var user = {
        "userName": document.getElementById('unamesave').value,
        "password": document.getElementById('savepass').value,
        "firstName": document.getElementById('fnamesave').value,
        "lastName": document.getElementById('lnamesave').value,
        "email": document.getElementById('savemail').value,
        "qualification": document.getElementById('savequali').value,
        "phoneNumber": document.getElementById('phonesave').value,
        "agreed": true,
        "verified": true
      }
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
     
          alert("Succesfully registered please login");
          window.location.reload();
            // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)
        // ..
      });
    

         }

  }



  render() {
    return (

      <div className="loginpageouter">
        <div class="login-wrap">
          <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="sign-in" readOnly checked /><label for="tab-1" class="tab" >Sign In</label>
            <input id="tab-2" type="radio" name="tab" class="sign-up" readOnly /><label for="tab-2" class="tab">Sign Up</label>
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
                    <label for="user" class="label">User Name<span className="impFld">*</span></label>
                    <input id="user" type="text" name="username" class="input" data-test="username" value={this.state.username} onChange={this.handleUserChange} required ></input>
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Password<span className="impFld">*</span></label>
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
              <form onSubmit={this.save}>
                <div class="sign-up-htm">
                  <div class="Sgroup">
                    <label for="fnamesave" class="label">First Name<span className="impFld">*</span></label>
                    <input id="fnamesave" type="text" class="input" required />
                  </div>
                  <div class="Sgroup">
                    <label for="lnamesave" class="label">Last Name<span className="impFld">*</span></label>
                    <input id="lnamesave" type="text" class="input" required />
                  </div>
                  <div class="Sgroup">
                    <label for="unamesave" class="label">User Name<span className="impFld">*</span></label>
                    <input id="unamesave" type="text" class="input" required />
                  </div>
                  <div class="Sgroup">
                    <label for="savemail" class="label">Email Address<span className="impFld">*</span></label>
                    <input id="savemail" type="email" class="input" required />
                  </div>
                  <div class="Sgroup">
                    <label for="phonesave" class="label">Phone Number<span className="impFld">*</span></label>
                    <input id="phonesave" type="number" class="input" required />
                  </div>
                  <div class="Sgroup">
                    <label for="saveaddress" class="label">Address<span className="impFld">*</span></label>
                    <input id="saveaddress" type="text" class="input" required />
                  </div>
                  <div class="Sgroup">
                    <label for="savepass" class="label">Password<span className="impFld">*</span></label>
                    <input id="savepass" type="password" class="input" data-type="password" required />
                  </div>
                  <div class="Sgroup">
                    <label for="saverpass" class="label">Repeat Password<span className="impFld">*</span></label>
                    <input id="saverpass" type="password" class="input" data-type="password" required />
                  </div>
                  <div class="">
                    <label for="savequali" class="form-label">Qualifications<span className="impFld">*</span></label>
                    <input class="form-control" list="datalistOptions" id="savequali" placeholder="Type to search..."></input>
                    <datalist id="datalistOptions">
                      <option value="Medical Doctor"></option>
                      <option value="Nurse"></option>
                      <option value="Paramedic"></option>
                      <option value="EMTB"></option>
                      <option value="EMR"></option>
                      <option value="Fire Fighter"></option>
                      <option value="CERT Trained"></option>
                      <option value="Law Inforcement"></option>
                      <option value="Others"></option>
                    </datalist>
                  </div>
                  <div class="Bgroup">
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
        <div class="image" title="Welcome to CERT"></div>
      </div>
    )
  }
}

export default LogIn

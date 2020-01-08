import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormInput } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import { useState, useEffect } from 'react';
import { geolocated } from "react-geolocated";
import axios from 'axios';
import ReactGA from 'react-ga';
import FacebookLogin from 'react-facebook-login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


const publicIp = require('public-ip');
const { UserAgent } = require("react-useragent");
var faker = require('faker');

ReactGA.initialize('UA-000000-01');

class Demo extends React.Component {
  render() {
      return !this.props.isGeolocationAvailable ? (
        <span></span>
      ) : !this.props.isGeolocationEnabled ? (
          <span></span>
      ) : this.props.coords ? (
          <table>
              <tbody>
                  <tr>
                      <td>latitude</td>
                      <td>{this.props.coords.latitude}</td>
                  </tr>
                  <tr>
                      <td>longitude</td>
                      <td>{this.props.coords.longitude}</td>
                  </tr>
                  <tr>
                      <td>altitude</td>
                      <td>{this.props.coords.altitude}</td>
                  </tr>
                  <tr>
                      <td>heading</td>
                      <td>{this.props.coords.heading}</td>
                  </tr>
                  <tr>
                      <td>speed</td>
                      <td>{this.props.coords.speed}</td>
                  </tr>
              </tbody>
          </table>
      ) : (
          <div>Getting the location data&hellip; </div>
      );
  }
}


class ShakingError extends React.Component {
	constructor() { super(); this.state = { key: 0 }; }

	componentWillReceiveProps() {
    // update key to remount the component to rerun the animation
  	this.setState({ key: ++this.state.key });
  }
  
  render() {
  	return <div key={this.state.key} className="bounce">{this.props.text}</div>;
  }
}

class AboutPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log('I was triggered during componentDidMount')
  }

  render() {
  	const { res, invalid, displayErrors } = this.state;
    return (
    	<div>
        <h1>About Axiom</h1>
        <p>Invest your money from anywhere with up to 20x leverage</p>
    	</div>
    );
  }
}



class UserPage extends React.Component {

  state = {
    user: null
  }

  constructor() {
    super();
  }

  getUser() {
    axios.get('http://localhost:5000/users/5e15f538e59ae69c48fd1053')
    .then(response => this.setState({user: response.data}))
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getUser()
  }

  userData(){
    if (this.state.user !== null) {
      var user = this.state.user;

      if (user.referralcount == 0){
        return 0
      } else if (user.referralcount > 0) {
        return 1
      } else if (user.referralcount < 0) {
        return 1
      }

    }
  }


  render() {
    return (
    	<div>
        <h1>Axiom User</h1>
        <p>You have {this.userData()} invitations</p>
        <span>{}</span>
    	</div>
    );
  }
}

class FrontPage extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('I was triggered during componentDidMount')
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
    	this.setState({
        invalid: true,
        displayErrors: true,
      });
      return;
    }

    const form = event.target;
    const data = new FormData(form);

    // const ipv4 = await publicIp.v4() || "";
    // const ipv6 = await publicIp.v6() || "";
    const ipv4 = 0
    const ipv6 = 0

    var submission = {
        email             : this.email.value,
        ipaddress         : faker.internet.ip(),
        // ipv6address       : ipv6,
        // firstname         : "",
        // lastname          : "",
        // phonezone         : 0,
        // phonenumber       : "",
        // screenheight      : 0,
        // screenwidth       : 0,
        // variantid         : 0,
        // sourceurl         : 0,
        // useragent         : 0,
        // timetillsignup    : 0,
        // latitude          : 0,
        // longitude         : 0,
        // locale            : 0,
        // language          : 0,
        // country           : 0,
        // region            : 0,
        // cookies           : 0,
    }

    alert('The value is: ' + JSON.stringify(submission));
    
    this.setState({
    	res: JSON.stringify(data),
      invalid: false,
      displayErrors: false,
    });

    axios.post(`http://localhost:5000/users`, submission)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(err =>{
        console.error(err)
      })
  }

  render() {
  	const { res, invalid, displayErrors } = this.state;
    return (
    	<div>
        <h1>Axiom</h1>
        <p>Invest your money from anywhere with up to 20x leverage</p>

        <form
          onSubmit={this.handleSubmit}
          noValidate
          className={displayErrors ? 'displayErrors' : ''}
         >
          <input className="inline" id="email" name="email" type="email" ref={(email) => this.email = email} placeholder="Enter email address" required />
          <button type="submit" className="inline">Get Early Access</button>
          <p>Already registered? <a href="/user">Check your rank</a></p>
        </form>
        
        
        <div className="res-block">
          {invalid && (
            <ShakingError text="Form is not valid" />
          )}
        </div>
    	</div>
    );
  }
}

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/">
            <FrontPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


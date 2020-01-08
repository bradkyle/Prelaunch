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

const publicIp = require('public-ip');
const { UserAgent } = require("react-useragent");

ReactGA.initialize('UA-000000-01');

class Demo extends React.Component {
  render() {
      return !this.props.isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
      ) : !this.props.isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
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

class MyForm extends React.Component {
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
        ipv4address       : ipv4,
        ipv6address       : ipv6,
        firstname         : "",
        lastname          : "",
        phonezone         : 0,
        phonenumber       : "",
        screenheight      : 0,
        screenwidth       : 0,
        variantid         : 0,
        sourceurl         : 0,
        useragent         : 0,
        timetillsignup    : 0,
        latitude          : 0,
        longitude         : 0,
        locale            : 0,
        language          : 0,
        country           : 0,
        region            : 0,
        cookies           : 0,
    }

    alert('The value is: ' + JSON.stringify(submission));
    
    this.setState({
    	res: JSON.stringify(data),
      invalid: false,
      displayErrors: false,
    });

    // axios.post(`localhost:5000/users`, { user })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
  }

  render() {
  	const { res, invalid, displayErrors } = this.state;
    return (
    	<div>
        <form
          onSubmit={this.handleSubmit}
          noValidate
          className={displayErrors ? 'displayErrors' : ''}
         >
          <h1>Axiom</h1>
          <p>Invest your money from anywhere with up to 20x leverage</p>
          <input className="inline" id="email" name="email" type="email" ref={(email) => this.email = email} placeholder="Enter email address" required />
          <button type="submit" className="inline">Get Early Access</button>
        </form>
        
        <div className="res-block">
          {invalid && (
            <ShakingError text="Form is not valid" />
          )}
          {!invalid && res && (
          	<div>
              <h3>Transformed data to be sent:</h3>
              <pre>FormData {res}</pre>
          	</div>
          )}
        </div>
    	</div>
    );
  }
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Demo/>
        <MyForm />
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormInput } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import getMAC, { isMAC } from 'getmac';
import { useState, useEffect } from 'react';

const publicIp = require('public-ip');
const { UserAgent } = require("react-useragent");

// const ipv4 = await publicIp.v4()
// const ipv6 = await publicIp.v6()

function checkUser(){

}

/*
  Gets all the information available from the user
*/
function constructSubmission(
  email,
  firstname,
  lastname,
  phonenumber,
  variantid,

) {
  // const ipv4 = await publicIp.v4() || "";
  // const ipv6 = await publicIp.v6() || "";
  const ipv4 = 0
  const ipv6 = 0

    var submission = {
        email             : email,
        ipv4address       : ipv4,
        ipv6address       : ipv6,
        macaddress        : getMAC(),
        firstname         : firstname,
        lastname          : lastname,
        phonezone         : 0,
        phonenumber       : phonenumber,
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
}

const inputParsers = {
  date(input) {
    const split = input.split('/');
    const day = split[1]
    const month = split[0];
    const year = split[2];
    return `${year}-${month}-${day}`;
  },
  uppercase(input) {
    return input.toUpperCase();
  },
  number(input) {
    return parseFloat(input);
  },
};

function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
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

    for (let name of data.keys()) {
      const input = form.elements[name];
      const parserName = input.dataset.parse;
      console.log('parser name is', parserName);
      if (parserName) {
        const parsedValue = inputParsers[parserName](data.get(name))
        data.set(name, parsedValue);
      }
    }
    
    this.setState({
    	res: stringifyFormData(data),
      invalid: false,
      displayErrors: false,
    });

    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
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
          <input className="inline" id="email" name="email" type="email" placeholder="Enter email address" required />
          <button className="inline">Get Early Access</button>
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
        <MyForm />
      </header>
    </div>
  );
}

export default App;

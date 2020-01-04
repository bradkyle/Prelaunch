import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormInput } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import getMAC, { isMAC } from 'getmac'

const publicIp = require('public-ip');
const { UserAgent } = require("react-useragent");
const Joi = require('joi'); 



// const ipv4 = await publicIp.v4()
// const ipv6 = await publicIp.v6()

function getData() {
  var data = {
    mac: getMAC(),
    ipv4: null,
    ipv6: null,
    useragent: null,
    cookies: null,

  }
}

function constructSubmission() {
    var submission = {
        email             : Joi.string().email().required(),
        ipv4address       : Joi.string().ip(),
        ipv6address       : Joi.string().ip(),
        macaddress        : Joi.string(),
        firstname         : Joi.string(),
        lastname          : Joi.string(),
        phonenumber       : Joi.string(),
        phonezone         : Joi.string(),
        variantid         : Joi.string(),
        sourceurl         : Joi.string(),
        useragent         : Joi.string(),
        timetillsignup    : Joi.number(),
        latitude          : Joi.string(),
        longitude         : Joi.string(),
        locale            : Joi.string(),
        language          : Joi.string(),
        country           : Joi.string(),
        region            : Joi.string(),
        cookies           : Joi.string(),
        emailsent         : Joi.boolean(),
        emailopened       : Joi.boolean(),
        disabled          : Joi.boolean(),
        hasreferrals      : Joi.boolean(),
        hasemail          : Joi.boolean(),
        hasphone          : Joi.boolean(),
        whatsappsent      : Joi.boolean(),
        whatsappopened    : Joi.boolean(),
        messagesent       : Joi.boolean(),
        messageopened     : Joi.boolean(),
        referralcount     : Joi.number().integer().min(0)
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

    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
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

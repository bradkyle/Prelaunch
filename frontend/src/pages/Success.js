import React from 'react';
import MainFooter from '../components/MainFooter'

import { 
  Button, 
  InputGroup , 
  Alert,
  Intent
} from "@blueprintjs/core";
import axios from 'axios';


import { Redirect } from "react-router-dom";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';



var faker = require('faker');

class SuccessPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  constructor() {
    super();

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleMoveCancel = this.handleMoveCancel.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;

    // axios.get('http://localhost:5000/users/find?id='+userid.toString())
    //       .then(res => {
    //         this.setState(res.data);
    //         console.error(this.state);
    //       })
    //       .catch(err => console.log(err))

    var userid = cookies.get('userid');
    if (userid) {
      this.setState({
        isSignedUp: true
      });  
    } 
    console.log('I was triggered during componentDidMount')
  }

  handleSubmit(event) {
    event.preventDefault();
    const { cookies } = this.props;
    
    const ipv4 = 0
    const ipv6 = 0

    console.log(this.state.email)

    var submission = {
        email             : this.state.email,
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

    this.setState({
      invalid: false,
      displayErrors: false,
    });

    axios.post(`http://localhost:5000/users`, submission)
      .then(res => {    
        cookies.set('userid', res.data._id, { path: '/' });
        this.setState({
          isSignedUp: true
        });  
      }).catch(err =>{
        console.error(err)
        this.setState({
          error: JSON.stringify(err.response),
          invalid: true,
          displayErrors: true,
        });    
      })
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleFacebookLogin(event) {
    console.log(event)
  }

  handleGoogleLogin(event) {
    console.log(event)
  }

  handleMoveCancel(event) {
    this.setState({displayErrors: false});
  }

  // TODO we have already sent an email, would you like us to resend
  render() {
  	const { res, invalid, displayErrors } = this.state;
    
    const submitButton = (
      <Button minimal={true} onClick={this.handleSubmit}>
          Get Early Access
      </Button>
    );

    if (this.state.isSignedUp) {
      // redirect to home if signed up
      return <Redirect to = {{ 
        pathname: "/user",
      }} />;
    }

    return (
      <div className="front-page">
        <div className="container content">
          <h1 className="center logo-white logo">Thanks!</h1>
          <h2 className="center subtitle">We have sent an email to your address</h2>
          <p className="center">Be sure to verify your email by clicking the "JOIN" button in the email we sent you</p>
          <p className="center">Haven't reveived it?  <a href="/user">Click to resend</a></p>
          <MainFooter/>
          <div className="res-block">
            {invalid && (
              <Alert
                  className=""
                  cancelButtonText="Cancel"
                  icon="trash"
                  intent={Intent.DANGER}
                  isOpen={this.state.displayErrors}
                  onCancel={this.handleMoveCancel}
              >
                  <p>
                      {this.state.error}
                  </p>
              </Alert>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(SuccessPage);

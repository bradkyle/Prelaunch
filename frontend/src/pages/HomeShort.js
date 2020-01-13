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

class HomePage extends React.Component {
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
          <h1 className="center logo-white logo">Axiom</h1>
          <h2 className="center subtitle">Invest your money from anywhere with up to 20x leverage</h2>
          <p className="center">Get early access, life-time annuity and stock, yup stock from referring your friends.</p>
          <div className="row">
          <div className="col-md-6">
          <form
            onSubmit={this.handleSubmit}
            noValidate
            className={displayErrors ? 'displayErrors' : ''}
          >
            <InputGroup 
              id="email"
              name="email"
              onChange={this.handleEmailChange}
              value={this.state.email}
              large={true} 
              placeholder="Email address"
              rightElement={submitButton}
              className="front-page-email-input"
            />
            <p className="front-page-email-input-text center">Already registered? <a href="/user">Check your rank</a></p>
          </form>
          </div>
          <div className="col-md-6">
          {/* <FacebookLogin
            appId="445074949709489"
            autoLoad={true}
            fields="name,email,picture"
            // onClick={componentClicked}
            callback={this.handleFacebookLogin} 
            /> */}

            <GoogleLogin
              clientId="" //CLIENTID NOT CREATED YET
              buttonText="JOIN WITH GOOGLE"
              onSuccess={this.handleGoogleLogin}
              onFailure={this.handleGoogleLogin}
              className="fill"
            />
            <p className="front-page-email-input-text center">We will never post to your pages</p>
          </div>
          </div>
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

export default withCookies(HomePage);

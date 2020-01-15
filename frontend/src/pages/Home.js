import React from 'react';
import MainFooter from '../components/MainFooter'

import { 
  Button, 
  InputGroup , 
  Alert,
  Card, 
  Intent
} from "@blueprintjs/core";
import axios from 'axios';


import { Redirect } from "react-router-dom";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import ReCAPTCHA from "react-google-recaptcha";
import { useParams} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    console.error(this.props);
    

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
      displayErrors: false
    });

    axios.post(`http://localhost:5000/users`, submission)
      .then(res => {    
        cookies.set('userid', res.data._id, { path: '/' });
        this.setState({
          isSignedUp: true
        });  
      }).catch(err =>{
        if (err.response.data.message && err.response.data.message.includes("duplicate key")){
          console.error(err)
          this.setState({
            alreadyRegistered: true
          });   
          console.log(this.state);
        }         
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

  onChange(value) {
    console.log("Captcha value:", value);
  }

  // TODO we have already sent an email, would you like us to resend
  render() {
  	const { res, invalid, displayErrors } = this.state;
    
    const submitButton = (
      <Button minimal={true} onClick={this.handleSubmit} className="join-button">
          Get Early Access
      </Button>
    );

    if (this.state.isSignedUp) {
      // redirect to home if signed up
      return <Redirect to = {{ 
        pathname: "/user",
      }} />;
    }

    if (this.state.alreadyRegistered) {
      // redirect to home if signed up
      return <Redirect to = {{ 
        pathname: "/resend",
      }} />;
    }

    return (
      <div className="front-page">
        <div className="container content">
          <h1 className="center logo-white logo">Axiom</h1>
          <h2 className="center subtitle">Investing and trading available 24/7 with crypto funding, less than zero commission and immediate execution.</h2>
          <p className="center">Get early access and commission from referring your friends. Launching June 2020.</p>
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
          {/* <ReCAPTCHA
            sitekey="6Lc6284UAAAAAFzbHPmbcZdR3EMb-HOyIm_HJqvh"
            onChange={this.onChange}
          /> */}
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
          <div className = "row header">
              </div>

              <h3 className="center subtitle">Features</h3>
              <div className="row card-row">
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon={['fab', 'apple']} className="fa-3x"/>
                    <FontAwesomeIcon icon={['fab', 'facebook-square']} className="fa-3x"/>
                    <FontAwesomeIcon icon={['fab', 'microsoft']} className="fa-3x"/>
                    <br></br>
                    <p>Trade the top stocks, cryptocurrencies and indexes</p>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon='funnel-dollar' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>No overnight fees or periodic funding fees</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon='balance-scale' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>Equal market maker and market taker fees</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon='database' className="fa-3x"/>
                    <FontAwesomeIcon icon='table' className="fa-3x"/>
                    <FontAwesomeIcon icon='server' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>Direct high speed API access and integration</p>
                    </div>
                    </Card>
                </div>
              </div>
              <div className="row card-row">
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon='dollar-sign' className="fa-3x"/>
                    <FontAwesomeIcon icon='dollar-sign' className="fa-3x"/>
                    <FontAwesomeIcon icon='dollar-sign' className="fa-3x"/>
                    <br></br>
                    <p>Up to 50x leverage on all instruments</p>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon='comments-dollar' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>Institutional quality news, social sentiment analysis and updates</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon='clock' className="fa-3x"/>
                    <FontAwesomeIcon icon='calendar' className="fa-3x"/>
                    <FontAwesomeIcon icon='calendar-alt' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>24/7/365 Stock trading with no close periods (you heard right)</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon="dice-d20" className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>Free historical, alternative and real time data</p>
                    </div>
                    </Card>
                </div>
              </div>
              <div className="row card-row">
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon="users" className="fa-3x"/>
                    <br></br>
                    <p>Peer to Peer transactions, no CFD contracts</p>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon='globe-europe' className="fa-3x"/>
                    <FontAwesomeIcon icon='globe-asia' className="fa-3x"/>
                    <FontAwesomeIcon icon='globe-americas' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>International availability and multi language support</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon={['fab', 'bitcoin']} className="fa-3x"/>
                    <FontAwesomeIcon icon={['fab', 'monero']} className="fa-3x"/>
                    {/* <FontAwesomeIcon icon={['fab', 'ethereum']} className="fa-3x"/> */}
                    <br></br>
                    <div class="feature-card-content">
                    <p>Instant crypto funding deposits with no minimum (Yup)</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <FontAwesomeIcon icon='user-tie' className="fa-3x"/>
                    <FontAwesomeIcon icon='user-ninja' className="fa-3x"/>
                    <FontAwesomeIcon icon='user-astronaut' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>Advanced trading, execution and customization</p>
                    </div>
                    </Card>
                </div>
              </div>
          {/* <MainFooter/> */}
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
        <div className="full-row-highlighted">
          <div className="highlight-divider"></div>
          <div className="container">
            <h3 className="center subtitle">Prelaunch Campaign</h3>
            <p className="center">Get early access and commission from referring your friends. Launching June 2020.</p>
              
            <Card className="blue-card-perm prelaunch-tier-row">
              <h3>Refer more than 10 people</h3>
                    
            </Card>
            <Card className="blue-card-perm prelaunch-tier-row">
              <h3>Refer more than 50 people</h3>
                    
            </Card>
            <Card className="blue-card-perm prelaunch-tier-row">
              <h3>Refer more than 100 people</h3>
                    
            </Card>
            <Card className="blue-card-perm prelaunch-tier-row">
              <h3>Be in our top 10</h3>
                    
            </Card>
            <Card className="blue-card-perm prelaunch-tier-row">
              <h3>Be our top referrer</h3>
              <Button className="gradient-button">Join</Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(HomePage);

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
      <Button minimal={true} onClick={this.handleSubmit} intent="success" className="join-button">
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
          <h2 className="center logo-white">Less than zero commission stock trading</h2>
          <p className="center">Get early access and commission from referring your friends. Launching June 2020.</p>
          <div className="row">
          <div className="col-md-6 access-form">
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
          </div>
          <div className = "row header">
              </div>

              <div className="row card-row">
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <div className="feature-card-bg"  style={{backgroundImage: 'url(https://financeandmarkets.com/wp-content/uploads/2019/06/Wall-Street-bull.jpg)',}}></div>
                    <FontAwesomeIcon icon={['fab', 'apple']} className="fa-3x"/>
                    <FontAwesomeIcon icon={['fab', 'facebook-square']} className="fa-3x"/>
                    <FontAwesomeIcon icon={['fab', 'microsoft']} className="fa-3x"/>
                    <br></br>
                    <p>Trade the top stocks, cryptocurrencies and indexes</p>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm">
                    <div className="feature-card-bg"  style={{backgroundImage: 'url(https://www.danielstrading.com/wp-content/uploads/2018/02/Using-Technical-Indicators-in-Agricultural-Futures-Trading.jpg)',}}></div>
                    <FontAwesomeIcon icon='funnel-dollar' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>No overnight fees or periodic funding fees</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://www.nycgo.com/images/venues/1097/walllstreet-marleywhite-6068__x_large.jpg)',}}></div>
                    <FontAwesomeIcon icon='balance-scale' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>Equal market maker and market taker fees</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://engineering.fb.com/wp-content/uploads/2018/07/datacenter_LAD-1.png)',}}></div>
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
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://www.usnews.com/dims4/USNEWS/fd74dc2/2147483647/crop/424x283%2B0%2B0/resize/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fdbimages%2Fmaster%2F34553%2FFE_DA_InvestingStocks_110512.jpg)',}}></div>
                    <FontAwesomeIcon icon='dollar-sign' className="fa-3x"/>
                    <FontAwesomeIcon icon='dollar-sign' className="fa-3x"/>
                    <FontAwesomeIcon icon='dollar-sign' className="fa-3x"/>
                    <br></br>
                    <p>Up to 50x leverage on all instruments</p>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SqRa5H5R8HfaqsjT0kTAqLIxaFiMD7s21loujW7Cld5S4CtU&s)',}}></div>
                    <FontAwesomeIcon icon='comments-dollar' className="fa-3x"/>
                    <br></br>
                    <div class="feature-card-content">
                    <p>Institutional quality news, social sentiment and updates</p>
                    </div>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://assets.bwbx.io/images/users/iqjWHBFdfxIU/icuv5uwOAlwg/v1/1000x-1.jpg)',}}></div>
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
                    <div className="feature-card-bg" style={{backgroundImage: 'url(data:image/jpeg;base64,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)',}}></div>
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
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://www.danielstrading.com/wp-content/uploads/2018/02/Using-Technical-Indicators-in-Agricultural-Futures-Trading.jpg)',}}></div>
                    <FontAwesomeIcon icon="users" className="fa-3x"/>
                    <br></br>
                    <p>Peer to Peer transactions, no CFD contracts</p>
                    </Card>
                </div>
                <div className = "col-md-3 card-container">
                    <Card className="blue-card-perm ">
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://www.danielstrading.com/wp-content/uploads/2018/02/Using-Technical-Indicators-in-Agricultural-Futures-Trading.jpg)',}}></div>
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
                    <div className="feature-card-bg"  style={{backgroundImage: 'url(https://cdn.wallpapersafari.com/14/65/wGz8e6.jpg)',}}></div>
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
                    <Card className="blue-card-perm">
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://cdn.wallpapersafari.com/14/65/wGz8e6.jpg)',}}></div>
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
      </div>
    );
  }
}

export default withCookies(HomePage);

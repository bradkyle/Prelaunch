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
import ReactGA from 'react-ga';

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
    ReactGA.pageview('/about/contact-us');
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

  handleFocusEvent() {

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
              onFocus={this.handleFocusEvent}
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
                    <div className="feature-card-bg" style={{backgroundImage: 'url(https://www.wallpapers13.com/wp-content/uploads/2019/03/Boston-Skyline-finance-business-Boston-Harbor-Massachusetts-United-States-HD-Desktop-Wallpaper-3840x2160.jpg)',}}></div>
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
                    <div className="feature-card-bg"  style={{backgroundImage: 'url(data:image/jpeg;base64,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)',}}></div>
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

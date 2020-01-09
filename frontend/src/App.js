

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormInput } from "shards-react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import { useState, useEffect } from 'react';
import { geolocated } from "react-geolocated";
import axios from 'axios';
import ReactGA from 'react-ga';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  WeiboShareButton
} from "react-share";

import { 
  Button, 
  Card, 
  Elevation, 
  Divider, 
  FileInput, 
  FormGroup, 
  H5, 
  InputGroup , 
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Menu,
  MenuItem,
  Alignment,
  Position,
  Popover,
  ButtonGroup 
} from "@blueprintjs/core";

import { Steps } from 'rsuite';

import PrivacyPage from './pages/Privacy'
import AboutPage from './pages/About'
import TermsPage from './pages/Terms'
import LeaderboardPage from './pages/Leaderboard'
import PressPage from './pages/Press'


import MainNavbar from './components/MainNavBar'

const publicIp = require('public-ip');
const { UserAgent } = require("react-useragent");
var faker = require('faker');

ReactGA.initialize('UA-000000-01');

library.add(fab);

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

  handleCopy(){

  }

  handleCopyText(){

  }

  render() {
    

    return (
      <div>
      <MainNavbar className="main-navbar"></MainNavbar>
    	<div className="container content">

        <div className="card-wrapper">
          <Card interactive={false} elevation={Elevation.ONE} className="rltve main-user-banner">
            <div className="stage-banner"></div>
            <h1 className="center main-text">364 000 People ahead of you</h1>
            <p className="center">You have {this.userData()} referrals</p>
          </Card>
        </div>

        <div className="card-wrapper">
          <Card interactive={false} elevation={Elevation.ONE}>
            <Steps current={1}>
            <Steps.Item title="Refer at least 10 people" description="Earn 30% commission on referral trades" />
            <Steps.Item title="Refer at least 100 people" description="Earn 50% commission on referral trades" />
            <Steps.Item title="Refer at least 500 people" description="Earn 100% commission on referral trades" />
            <Steps.Item title="Be in our top 10 referrers" description="Earn 10,000 shares of Axiom stock" />
            <Steps.Item title="Be our number 1 referrer" description="Earn 60,000 shares of Axiom stock" />
          </Steps>
          </Card>
        </div>
        <div className="card-wrapper">
          <Card interactive={false} elevation={Elevation.ONE}>
            <div className="social-actions box">
            <div className = "social-card-container">
              <Card interactive={false} elevation={Elevation.ONE} className="social-share-card  fb">
                <FacebookShareButton url="www.github.com">
                <FontAwesomeIcon icon={['fab', 'facebook']} className="fa-3x"/>
                <p className="social-share-name">share</p>
                </FacebookShareButton>
              </Card>
            </div>
            <div className = "social-card-container">
              <Card interactive={false} elevation={Elevation.ONE} className="social-share-card">
                <FacebookShareButton url="www.github.com">
                <FontAwesomeIcon icon={['fab', 'twitter']} className="fa-3x"/>
                <p className="social-share-name">share</p>
                </FacebookShareButton>
              </Card>
            </div>
            <div className = "social-card-container">
              <Card interactive={false} elevation={Elevation.ONE} className="social-share-card">
                <FacebookShareButton url="www.github.com">
                <FontAwesomeIcon icon={['fab', 'linkedin']} className="fa-3x"/>
                <p className="social-share-name">share</p>
                </FacebookShareButton>
              </Card>
            </div>
            <div className = "social-card-container">
              <Card interactive={false} elevation={Elevation.ONE} className="social-share-card">
                <FacebookShareButton url="www.github.com">
                <FontAwesomeIcon icon={['fab', 'reddit']} className="fa-3x"/>
                <p className="social-share-name">share</p>
                </FacebookShareButton>
              </Card>
            </div>
            <div className = "social-card-container">
              <Card interactive={false} elevation={Elevation.ONE} className="social-share-card">
                <FacebookShareButton url="www.github.com">
                <FontAwesomeIcon icon={['fab', 'weibo']} className="fa-3x"/>
                <p className="social-share-name">share</p>
                </FacebookShareButton>
              </Card>
            </div>
            </div>
            <Divider />
            <Button className="more-social-cards-button">show more</Button>
            
        </Card>
        </div>
        <div className="card-wrapper">
          <Card interactive={false} elevation={Elevation.ONE}>
                <h5 className="center"><a href="#">Or share this unique link</a></h5>
                <InputGroup 
                  onChange={this.handleCopyText} 
                  large={true} 
                  value="ax.exchange?ref=dfjhasoidfhaosdfnadsifhsdofij" 
                  className="link-share-selector"
                />
          </Card>
        </div>
        

    	</div>
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

  handleFacebookLogin(event) {
    console.log(event)
  }

  handleGoogleLogin(event) {
    console.log(event)
  }

  render() {
  	const { res, invalid, displayErrors } = this.state;
    
    const submitButton = (
      <Button minimal={true} >
          Get Early Access
      </Button>
  );
   
    
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
              onChange={this.handleCopyText} 
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
          <div className="front-page-footer">
            <div className="container">
                <ul className="bp3-list-unstyled">
                  <li><a href="/about">About</a></li>
                  <li><a href="/press">Press</a></li>
                  <li><a href="/about">Rewards</a></li>
                  <li><a href="/leaderboard">Leaderboard</a></li>
                  <li><a href="/privacy">Privacy</a></li>
                  <li><a href="/terms">Terms</a></li>
                  <li><a href="/user">Your rank</a></li>
                </ul>
            </div>
          </div>
          <div className="res-block">
            {invalid && (
              <ShakingError text="Form is not valid" />
            )}
          </div>
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
          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>
          <Route path="/privacy">
            <PrivacyPage />
          </Route>
          <Route path="/terms">
            <TermsPage />
          </Route>
          <Route path="/press">
            <PressPage />
          </Route>
          <Route path="/">
            <FrontPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


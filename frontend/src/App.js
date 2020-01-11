

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormInput } from "shards-react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faKey 
} from '@fortawesome/free-solid-svg-icons';

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

import { Steps, Footer } from 'rsuite';

import PrivacyPage from './pages/Privacy'
import AboutPage from './pages/About'
import TermsPage from './pages/Terms'
import LeaderboardPage from './pages/Leaderboard'
import RewardsPage from './pages/Rewards';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import ReactPixel from 'react-facebook-pixel';


import MainNavbar from './components/MainNavBar'
import MainFooter from './components/MainFooter'

const publicIp = require('public-ip');
const { UserAgent } = require("react-useragent");
var faker = require('faker');

ReactGA.initialize('UA-000000-01');

const advancedMatching = { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
const options = {
    autoConfig: true, 	// set pixel's autoConfig
    debug: false, 		// enable logs
};

ReactPixel.init('yourPixelIdGoesHere', advancedMatching, options);


library.add(fab, faEnvelope);

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
    this.share_url="www.google.com"
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
                  <Card interactive={false} elevation={Elevation.ONE} className="social-share-card  fb blue-card">
                    <FacebookShareButton url={this.share_url}>
                    <FontAwesomeIcon icon={['fab', 'facebook']} className="fa-3x"/>
                    <p className="social-share-name">share</p>
                    </FacebookShareButton>
                  </Card>
                </div>
                <div className = "social-card-container">
                  <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                    <TwitterShareButton url={this.share_url}>
                    <FontAwesomeIcon icon={['fab', 'twitter']} className="fa-3x"/>
                    <p className="social-share-name">share</p>
                    </TwitterShareButton>
                  </Card>
                </div>
                <div className = "social-card-container">
                  <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                    <LinkedinShareButton url={this.share_url}>
                    <FontAwesomeIcon icon={['fab', 'linkedin']} className="fa-3x"/>
                    <p className="social-share-name">share</p>
                    </LinkedinShareButton>
                  </Card>
                </div>
                <div className = "social-card-container">
                  <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                    <RedditShareButton url={this.share_url}>
                    <FontAwesomeIcon icon={['fab', 'reddit']} className="fa-3x"/>
                    <p className="social-share-name">share</p>
                    </RedditShareButton>
                  </Card>
                </div>
                <div className = "social-card-container">
                  <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                    <WeiboShareButton url={this.share_url}>
                    <FontAwesomeIcon icon={['fab', 'weibo']} className="fa-3x"/>
                    <p className="social-share-name">share</p>
                    </WeiboShareButton>
                  </Card>
                </div>
                <div className = "social-card-container">
                  <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                    <EmailShareButton url={this.share_url}>
                    <FontAwesomeIcon icon='envelope' className="fa-3x"/>
                    <p className="social-share-name">email</p>
                    </EmailShareButton>
                  </Card>
                </div>
                <div className = "social-card-container">
                  <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                    <WhatsappShareButton url={this.share_url}>
                    <FontAwesomeIcon icon={['fab', 'whatsapp']} className="fa-3x"/>
                    <p className="social-share-name">share</p>
                    </WhatsappShareButton>
                  </Card>
                </div>
                <div className = "social-card-container">
                  <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                    <VKShareButton url={this.share_url}>
                    <FontAwesomeIcon icon={['fab', 'vk']} className="fa-3x"/>
                    <p className="social-share-name">share</p>
                    </VKShareButton>
                  </Card>
                </div>
            </div>  
            <Divider></Divider>
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
          <MainFooter/>
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

const seo = {
  title: "getd.io/",
  description:
    "A free, online API builder that works with CORS. A Postman alternative without the need for client app installation.",
  url: "https://getd.io/",
  image: "https://getd.io/image.png"
};

export default function App() {
  return (
    <Router>
      <div>
      <Helmet
          title={seo.title}
          meta={[
            { property: "og:url", content: seo.url },
            { property: "og:type", content: "image/png" },
            { property: "og:title", content: seo.title },
            { property: "og:image", content: seo.image },
            { property: "og:image:alt", content: "image/png" },
            {
              name: "description",
              property: "og:description",
              content: seo.description
            },
            { property: "og:site_name", content: "European Travel, Inc." },
            { property: "og:locale", content: "en_US" },

            { property: "twitter:card", content: "" },
            { property: "twitter:site", content: "@website-username" },
            { property: "twitter:creator", content: "@individual_account" },
            { property: "twitter:url", content: "https://example.com/page.html" },
            { property: "twitter:title", content: seo.title },
            { property: "twitter:description", content: seo.description },
            { property: "twitter:image", content: seo.image },
            { property: "twitter:image:src", content: seo.image },
            { property: "twitter:image:alt", content: "Alt text for image" },

            { property: "fb:app_id", content: "" },

            // Facebook instant article
            { property: "fb:article_style", content: "" },

            { property: "robots", content: "index,follow" },
            { property: "googlebot", content: "index,follow" },

            { property: "google-site-verification", content: "verification_token" },
            { property: "yandex-verification", content: "verification_token" },
            { property: "msvalidate.01", content: "verification_token" },
            { property: "alexaVerifyID", content: "verification_token" },
            { property: "p:domain_verify", content: "verification_token" },
            { property: "norton-safeweb-site-verification", content: "verification_token" },
            { property: "norton-safeweb-site-verification", content: "verification_token" },

            { property: "weibo:type", content: "" },

            //必填
          // <meta name ="weibo:type" content="video" />
          // <meta name ="weibo:video:url" content="视频的URL地址" />
          // <meta name ="weibo:video:title" content="视频的显示名称" />
          // <meta name ="weibo:video:description" content="视频的文字描述" />
          // //选填
          // <meta name ="weibo:video:image" content="视频的缩略显示图片" />
          // <meta name="weibo:video:embed_code" content="视频播放的嵌入代码" />
          // <meta name="weibo:video:duration" content="视频播放的时长，单位秒" />
          // <meta name="weibo:video:stream" content="视频流的链接源" />
          // <meta name="weibo:video:create_at" content="用户的创建时间" />
          // <meta name="weibo:video:update_at" content="用户的更新时间" />

          //必填
          // <meta property="og:type" content="webpage" />
          // <meta property="og:url" content="http://sports.sina.com.cn/nba/2012-12-26/06576353009.shtml" />
          // <meta property="og:title" content="圣诞战总得分王!科比34+5写历史 暴强数据16年第2" />
          // <meta property="og:description" content="科比-布莱恩特不出意料地拿下34分并成为了圣诞大战史上得分王，不仅如此，这位34岁的神已连续9场比赛得分30+，创造了个人生涯第二好成绩并向着2003年连续16场的壮举继续迈进！" />
          // //选填
          // <meta property="og:image" content="http://i2.sinaimg.cn/ty/nba/2012-12-26/U4934P6T12D6353009F1286DT20121226070232.jpg" />
          // <meta name="weibo:webpage:create_at" content="2012-12-26 06:57:00" />
          // <meta name="weibo:webpage:update_at" content="2012-12-26 06:57:00" />

          // image属性定义多个值，即多张图片
          // <meta property="og:image" content="示例图片1" />
          // <meta property="og:image" content="示例图片2 " />
          // <meta property="og:image" content="示例图片3" />
          // <meta name="weibo:webpage: image" content="图片示例4" />
          // <meta name="weibo:webpage: image" content="图片示例5" />

            
          ]}
          link={[
            { rel: "canonical", content: "https://example.com/article.html" },
          ]}
        />
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/rewards">
            <RewardsPage />
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
          <Route path="/">
            <FrontPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


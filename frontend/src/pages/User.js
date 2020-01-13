
import React from 'react';

import MainNavbar from '../components/MainNavBar';
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
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {  
    Card, 
    Elevation, 
    Divider, 
    InputGroup 
} from "@blueprintjs/core";
import { Steps, Footer } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from "react-router-dom";

import axios from 'axios';

class UserPage extends React.Component {

    state = {
      user: null
    }

    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    
    constructor() {
      super();
      this.state = {
        isSignedUp: true
      };
      this.share_url="www.axiom.fi"
      this.hashtags = ["axiom"]
      this.title = "$0 commission 24/7 stock trading"
      this.twitter_via = ""
      this.summary = ""
      this.image = ""
    }
  
    componentDidMount() {
      // this.getUser()
      
      const { cookies } = this.props;

      var userid = cookies.get('userid');
      if (!userid) {
        this.setState({
          isSignedUp: false
        });  
      } else {
        axios.get('http://localhost:5000/users/find?id='+userid.toString())
          .then(res => {
            this.setState(res.data);
            console.error(this.state);
          })
          .catch(err => console.log(err))
      }
    }
  
    handleCopy(){
      
    }
  
    handleCopyText(){
  
    }
  
    render() {
      
      if (!this.state.isSignedUp) {
        // redirect to home if signed up
        return <Redirect to = {{ pathname: "/"}} />;
      }
      
  
      return (
        <div>
        <MainNavbar className="main-navbar"></MainNavbar>
          <div className="container content">
  
          <div className="card-wrapper">
            <Card interactive={false} elevation={Elevation.ONE} className="rltve main-user-banner">
              <div className="stage-banner"></div>
              <h1 className="center main-text">{this.state.position} People ahead of you</h1>
              <p className="center">You have {this.state.referralcount || 0} referrals</p>
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
                      <FacebookShareButton url={this.state.share_url} quote={this.title} hashtag={this.hashtags[0]}>
                      <FontAwesomeIcon icon={['fab', 'facebook']} className="fa-3x"/>
                      <p className="social-share-name">share</p>
                      </FacebookShareButton>
                    </Card>
                  </div>
                  <div className = "social-card-container">
                    <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                      <TwitterShareButton url={this.state.share_url} title={this.title} via={this.twitter_via} hashtags={this.hashtags}>
                      <FontAwesomeIcon icon={['fab', 'twitter']} className="fa-3x"/>
                      <p className="social-share-name">share</p>
                      </TwitterShareButton>
                    </Card>
                  </div>
                  <div className = "social-card-container">
                    <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                      <LinkedinShareButton url={this.state.share_url} title={this.title} summary={this.summary} source={this.share_url}>
                      <FontAwesomeIcon icon={['fab', 'linkedin']} className="fa-3x"/>
                      <p className="social-share-name">share</p>
                      </LinkedinShareButton>
                    </Card>
                  </div>
                  <div className = "social-card-container">
                    <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                      <RedditShareButton url={this.state.share_url} title={this.title}>
                      <FontAwesomeIcon icon={['fab', 'reddit']} className="fa-3x"/>
                      <p className="social-share-name">share</p>
                      </RedditShareButton>
                    </Card>
                  </div>
                  <div className = "social-card-container">
                    <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                      <WeiboShareButton url={this.state.share_url} title={this.title} image={this.image}>
                      <FontAwesomeIcon icon={['fab', 'weibo']} className="fa-3x"/>
                      <p className="social-share-name">share</p>
                      </WeiboShareButton>
                    </Card>
                  </div>
                  <div className = "social-card-container">
                    <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                      <EmailShareButton url={this.state.share_url} subject={this.title} body={this.summary}>
                      <FontAwesomeIcon icon='envelope' className="fa-3x"/>
                      <p className="social-share-name">email</p>
                      </EmailShareButton>
                    </Card>
                  </div>
                  <div className = "social-card-container">
                    <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                      <WhatsappShareButton url={this.state.share_url} title={this.title}>
                      <FontAwesomeIcon icon={['fab', 'whatsapp']} className="fa-3x"/>
                      <p className="social-share-name">share</p>
                      </WhatsappShareButton>
                    </Card>
                  </div>
                  <div className = "social-card-container">
                    <Card interactive={false} elevation={Elevation.ONE} className="social-share-card blue-card">
                      <VKShareButton url={this.state.share_url} title={this.title} image={this.image}>
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

export default withCookies(UserPage);

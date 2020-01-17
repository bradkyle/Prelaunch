

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormInput } from "shards-react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faKey,
  faGlobeAmericas,
  faGlobeAsia,
  faGlobeEurope,
  faFunnelDollar,
  faClock,
  faCalendar,
  faDollarSign,
  faDatabase,
  faTable,
  faServer,
  faCommentDollar,
  faCommentsDollar,
  faBalanceScale,
  faDiceD20,
  faUsers,
  faUserAstronaut,
  faUserNinja,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { CookiesProvider, useCookies } from 'react-cookie';

import ReactGA from 'react-ga';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";


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


import UserPage from './pages/User'
import PrivacyPage from './pages/Privacy'
import AboutPage from './pages/About'
import TermsPage from './pages/Terms'
import LeaderboardPage from './pages/Leaderboard'
import RewardsPage from './pages/Rewards';
import HomePage from './pages/Home';
import SuccessPage from './pages/Success';
import ResendPage from './pages/Resend';


import PropTypes from "prop-types";
import Helmet from "react-helmet";
import ReactPixel from 'react-facebook-pixel';


const publicIp = require('public-ip');
const { UserAgent } = require("react-useragent");
var faker = require('faker');

ReactGA.initialize('G-YC1JG8F5LM');

const advancedMatching = { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
const options = {
    autoConfig: true, 	// set pixel's autoConfig
    debug: false, 		// enable logs
};

ReactPixel.init('yourPixelIdGoesHere', advancedMatching, options);


library.add(
  fab, 
  faEnvelope,
  faGlobeAmericas,
  faGlobeAsia,
  faGlobeEurope,
  faFunnelDollar,
  faClock,
  faCalendar,
  faDollarSign,
  faDatabase,
  faTable,
  faServer,
  faCommentsDollar,
  faBalanceScale,
  faDiceD20,
  faUsers,
  faUserAstronaut,
  faUserNinja,
  faUserTie
);




const seo = {
  title: "getd.io/",
  sitename: "",
  description: "A free, online API builder that works with CORS. A Postman alternative without the need for client app installation.",
  url: "https://getd.io/",
  image: "https://getd.io/image.png",
  locale: "en_US"

};

export default function App() {
  const [cookies, setCookie] = useCookies(['name']);
  
  return (
    <CookiesProvider>
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
              { property: "og:site_name", content: seo.sitename },
              { property: "og:locale", content: seo.locale },

              { property: "twitter:card", content: seo.twittercard },
              { property: "twitter:site", content: seo.twittersite },
              { property: "twitter:creator", content: seo.twittercreator },
              { property: "twitter:url", content: seo.url },
              { property: "twitter:title", content: seo.title },
              { property: "twitter:description", content: seo.description },
              { property: "twitter:image", content: seo.image },
              { property: "twitter:image:src", content: seo.image },
              { property: "twitter:image:alt", content: seo.imagealt },

              { property: "fb:app_id", content: seo.fbappid },

              // Facebook instant article
              { property: "fb:article_style", content: seo.fbarticlestyle },

              { property: "robots", content: "index,follow" },
              { property: "googlebot", content: "index,follow" },

              { property: "google-site-verification", content: seo.googleverif },
              { property: "yandex-verification", content: seo.yandexverif },
              { property: "msvalidate.01", content: seo.msverif },
              { property: "alexaVerifyID", content: seo.alexaverif },
              { property: "p:domain_verify", content: seo.domainverif },
              { property: "norton-safeweb-site-verification", content: seo.nortonverif },

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
              { rel: "canonical", content: seo.url },
            ]}
          />
          <Switch>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/success">
              <SuccessPage />
            </Route>
            <Route path="/resend">
              <ResendPage />
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
            <Route path="/register/:id">
              <HomePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </CookiesProvider>
  );
}


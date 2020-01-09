import React from 'react';

import MainNavbar from '../components/MainNavBar'

export default class LeaderboardPage extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
  
    componentDidMount() {
      console.log('I was triggered during componentDidMount')
    }
  
    render() {
        const { res, invalid, displayErrors } = this.state;
      return (
          <div>
            <MainNavbar className="main-navbar"></MainNavbar>
            <div className="container content">
              <h1>Axiom Leaderboard</h1>
            </div>
          </div>
      );
    }
  }
  

import React from 'react';

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
    Popover
  } from "@blueprintjs/core";

export default class MainFooter extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
  
    render() {
      return (
            <div className="front-page-footer">
                <div className="container">
                    <ul className="bp3-list-unstyled">
                    <li><a href="/about">About</a></li>
                    <li><a href="/rewards">Rewards</a></li>
                    <li><a href="/leaderboard">Leaderboard</a></li>
                    <li><a href="/user">Your rank</a></li>
                    <li><a href="/privacy">Privacy</a></li>
                    <li><a href="/terms">Terms</a></li>
                    </ul>
                </div>
        </div>
        );
    }
  
  }
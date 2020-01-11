import React from 'react';

import MainNavbar from '../components/MainNavBar';

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

export default class AboutPage extends React.Component {
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
          <h1>About Axiom</h1>
            
          <Card className="blue-card col-md-3">PDF press kit</Card>
          </div>
          </div>
      );
    }
  }
  
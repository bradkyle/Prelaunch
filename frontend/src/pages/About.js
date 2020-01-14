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
          <div className="about-page">
            <a href="/"><h1 className="logo-white center about-logo">Axiom</h1></a>
            <div className="container content">
              <div className = "row header">

              </div>
              <div className="row">
              <div className = "col-md-3 card-container">
                  <Card className="blue-card-perm ">PDF press kit</Card>
              </div>
              <div className = "col-md-3 card-container">
                  <Card className="blue-card-perm ">PDF press kit</Card>
              </div>
              <div className = "col-md-3 card-container">
                  <Card className="blue-card-perm ">PDF press kit</Card>
              </div>
              <div className = "col-md-3 card-container">
                  <Card className="blue-card-perm ">PDF press kit</Card>
              </div>
              </div>
            </div>
            <div className="row">
            </div>
          </div>
      );
    }
  }
  
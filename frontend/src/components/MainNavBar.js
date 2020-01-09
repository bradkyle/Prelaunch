
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

export default class MainNavbar extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
  
    render() {
        const { res, invalid, displayErrors } = this.state;
      return (
          <Navbar>
            <div className="container opaque">
              <NavbarGroup>
              <h4 className="logo-white">Axiom</h4>
              </NavbarGroup>
              <NavbarGroup className="bp3-dark" align={Alignment.RIGHT}>
                <Menu>
                  <MenuItem text="English">
                      <MenuItem text="Spanish" />
                      <MenuItem text="Mandarin" />
                      <MenuItem text="Russian" />
                      <MenuItem text="Portuguese" />
                      <MenuItem text="Japanese" />
                      <MenuItem text="Arabic" />
                      <MenuItem text="German" />
                      <MenuItem text="Korean" />
                      <MenuItem text="French" />
                  </MenuItem>
              </Menu>
            </NavbarGroup>
            </div>          
        </Navbar>
      );
    }
  
  }
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormInput } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

function App() {

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  };

  return (
    <div className="App">
      <header className="App-header">
        <FormInput placeholder="My form input" />;
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
      </header>
    </div>
  );
}

export default App;

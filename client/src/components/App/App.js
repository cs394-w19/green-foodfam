import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class App extends Component {
  state = {
    data: null,
    location: ""
  };

  updateLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <img src="/logo.png" className="App-logo" alt="logo" />
        <div className="appHeader">FoodFam.</div>
        <br />
        <Link to="/location">
          <button className="goButton">Start Group</button>
        </Link>
        <br/>
        <Link to="/code">
          <button className="goButton">Join Group</button>
        </Link>
      </div>
    );
  }
}

export default App;

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
        <input
          className="locationInput"
          type="text"
          placeholder="Evanston, Illinois"
          onChange={e => this.updateLocation(e)}
        />
        <br />
        <Link
          to={{
            pathname: "/price",
            state: { loc: `${this.state.location}` }
          }}
        >
          <button className="goButton">GO</button>
        </Link>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Code extends Component {
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
        <div className="appQuestion">Enter your group code:</div>
        <input
          className="locationInput"
          type="tel"
          placeholder="****"
        />
        <br />
        <Link
          to={{
            pathname: "/price",
            state: { loc: `Evanston, IL` }
          }}
        >
          <button className="goButton">GO</button>
        </Link> <br/>
        <Link to="/">
          <button
            className="backButton"
            style={{ backgroundColor: "rgba(234, 72, 72, .8)" }}>
            <img className="containedButtonImg" src="/back.png" alt="" />
          </button> 
        </Link>
      </div>
    );
  }
}

export default Code;

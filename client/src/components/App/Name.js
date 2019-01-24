import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Name extends Component {
  state = {
    data: null
  };

  render() {
    return (
      <div className="App">
        <div className="appQuestion">Enter your username</div>

        <Link
          to={{
            pathname: "/price",
            state: { loc: this.props.location.state.loc }
          }}
        >
          <button className="goButton">GO</button>
          <br />
        </Link>
      </div>
    );
  }
}

export default Name;

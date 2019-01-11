import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Price extends Component {
  state = {
    data: null
  };

  render() {
    return (
      <div className="App">
        <div className="appQuestion">What's your price range?</div>
        <Link
          to={{
            pathname: "/category",
            state: { loc: this.props.location.state.loc }
          }}
        >
          <button className="goButton">$</button>
          <br />
          <button className="goButton">$$</button>
          <br />
          <button className="goButton">$$$</button>
          <br />
          <button className="goButton">$$$$</button>
          <br />
        </Link>
      </div>
    );
  }
}

export default Price;

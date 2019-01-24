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
        <div className="appCode"> GROUP CODE: <i>{this.props.location.state.code}</i> </div>
        <div className="appRecommend">What's your price range?</div>
        <Link
          to={{
            pathname: "/category",
            state: { loc: this.props.location.state.loc,
                     code: this.props.location.state.code}
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

        <Link to="/code">
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

export default Price;

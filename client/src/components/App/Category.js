import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Price extends Component {
  state = {
    data: null
  };

  render() {
    const yelpList = ["Mexican", "Thai", "American"];
    const categories = yelpList.map((category, i) => {
      return (
        <Link
          key={i}
          to={{
            pathname: "/result",
            state: { loc: this.props.location.state.loc }
          }}
          style={{ textAlign: "center" }}
        >
          <div className="goButton">{category}</div>
        </Link>
      );
    });
    return (
      <div className="App">
        <div className="appQuestion">What are you in the mood for?</div>
        <div style={{ marginLeft: "32%" }}>{categories}</div>

        <Link to="/price">
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

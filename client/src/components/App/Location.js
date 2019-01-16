import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class App extends Component {
  state = {
    data: null,
    location: "Evanston, IL",
    code: null
  };

  componentWillMount() {
    const val = Math.floor(1000 + Math.random() * 9000);
    this.setState({
      code: val
    });
  }

  updateLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <div className="appCode">
          GROUP CODE: <i>{this.state.code}</i>
        </div>
        <div className="appRecommend">What's your location?</div>
        <input
          className="locationInput"
          type="text"
          placeholder={this.state.location}
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

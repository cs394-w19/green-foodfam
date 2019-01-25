import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class App extends Component {
  state = {
    data: null,
    location: "Evanston, IL",
    code: null
  };

  updateLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  onComplete(){
    this.props.updateData('location',this.state.location)
    setTimeout(()=>this.props.createGroup(), 200)
  }

  render() {
    return (
      <div className="App">
        <div className="appQuestion">What's your location?</div>
        <input
          className="locationInput"
          type="text"
          placeholder={this.state.location}
          onChange={e => this.updateLocation(e)}
        />
          <br />
          <button onClick={()=>this.onComplete()} className="goButton">GO</button>
          <br />
          <button onClick={()=>this.props.updateCurrent('Home')} className="backButton"> Back</button>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios"

class Name extends Component {
  state = {
    data: null,
    name: ""
  };

  updateName = e => {
    this.setState({
      name: e.target.value
    });
  };

  onComplete(){
    this.props.updateData('name',this.state.name)
  }

  render() {
    return (
      <div className="App">
        <div className="appQuestion">Enter your name:</div>
        <input
          className="locationInput"
          type="text"
          placeholder='your name...'
          onChange={e => this.updateName(e)}
        />
        <br />
        <button onClick={()=>this.onComplete()} className="goButton">GO</button>
        <br/>
        <button onClick={()=>this.props.updateCurrent('Home')} className="backButton"> Back</button>
      </div>
    );
  }
}

export default Name;

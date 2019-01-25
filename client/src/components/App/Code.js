import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios"

class Code extends Component {
  state = {
    data: null,
    code: ""
  };

  updateCode = e => {
    this.setState({
      code: e.target.value
    });
  };

  onComplete(){
    this.props.updateData('roomname',this.state.code)
    setTimeout(()=>this.props.createUser(), 200)
  }

  render() {
    return (
      <div className="App">
        <div className="appQuestion">Enter your group code:</div>
        <input
          className="locationInput"
          type="tel"
          placeholder="****"
          onChange={e => this.updateCode(e)}
        />
        <br />
        <button onClick={()=>this.onComplete()} className="goButton">GO</button>
        <br/>
        <button onClick={()=>this.props.updateCurrent('Home')} className="backButton"> Back</button>
      </div>
    );
  }
}

export default Code;

import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Code from './Code'
import Category from './Category'
import Location from './Location'
import Price from './Price'
import Result from './Result'

class Home extends Component {
  state = {
    data: null,
    location: "",
    current:'app'
  };

  updateLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  render() {
    return (
      <div className='App'>
        <img src="/logo.png" className="App-logo" alt="logo" />
        <div className="appHeader">FoodFam.</div>
        <br />
        <button className="goButton" onClick={()=>this.props.updateCurrent('Location')}>Start Group</button>
        <br/>
        <Link to="/code">
          <button className="goButton">Join Group</button>
        </Link>
      </div>
    );
  }
}

export default Home;

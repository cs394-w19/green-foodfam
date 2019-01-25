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
    current:'app',
    name:null
  };

  updateLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  updateName = e => {
    this.setState({
      name: e.target.value
    });
  };

  onCompleteLocation(){
    this.props.updateData('name',this.state.name)
    this.props.updateCurrent('Location')
  }

  onCompleteCode(){
    this.props.updateData('name',this.state.name)
    this.props.updateCurrent('Code')
  }

  render() {
    return (
      <div className='App'>
        <img src="/logo.png" className="App-logo" alt="logo" />
        <div className="appHeader">FoodFam.</div>
        <br />
        <input
          className="locationInput"
          type="text"
          placeholder='your name...'
          onChange={e => this.updateName(e)}
        />
        <button className="goButton" onClick={()=>this.onCompleteLocation()}>Start Group</button>
        <br/>
        <button className="goButton" onClick={()=>this.onCompleteCode()}>Join Group</button>
      </div>
    );
  }
}

export default Home;

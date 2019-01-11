import React, { Component } from "react";
import "./App.css";
import { Link } from 'react-router-dom'

class App extends Component {
  state = {
    data: null
  };

  render() {
    return (
      <div className="App">
        <img src='/logo.png' className="App-logo" alt="logo" />
        <div className='appHeader'>FoodFam.</div>
        <input className='locationInput' type='text' placeholder='location...'/>
        <br/>
        <Link to='/price'>
          <button className='goButton'>GO</button>
        </Link>
      </div>
    );
  }
}

export default App;

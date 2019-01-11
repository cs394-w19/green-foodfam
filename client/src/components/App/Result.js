import React, { Component } from "react";
import "./App.css";
import { Link } from 'react-router-dom'

class Result extends Component {
  state = {
    data: null
  };

  render() {
    return (
      <div className="App">
        <div className='appRecommend'>We Recommend:</div>
      </div>
    );
  }
}

export default Result;

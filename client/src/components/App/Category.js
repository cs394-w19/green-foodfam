import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Price extends Component {
  state = {
    data: null,
  };

  onComplete(category){
    this.props.updateData('category',category)
    this.props.updateCurrent('Result')
  }

  render() {
    const yelpList = ["Mexican", "Thai", "American"];
    const categories = yelpList.map((category, i) => {
      return (
        <div onClick={()=>this.onComplete(category)} className="goButton">{category}</div>
      );
    });
    return (
      <div className="App">
        <div className="appQuestion">What are you in the mood for?</div>
        <div style={{ marginLeft: "32%" }}>{categories}</div>
        <br />
        <button onClick={()=>this.props.updateCurrent('Price')} className="backButton"> Back</button>
      </div>
    );
  }
}

export default Price;

import React, { Component } from "react";
import UserCount from "./UserCount";

class Price extends Component {

  onComplete(category) {
    this.props.updateData('category', category)
    setTimeout(() => {
      this.props.updatePreference()
      this.props.updateCurrent('Result')
    }, 1000)
  }

  render() {
    const yelpList = ['Mexican', 
    'Thai', 
    'American', 
    'Chinese',
    'Indian',
    'Korean',
    'Seafood',
    'Vegetarian',
    'Japanese'];
    const categories = yelpList.map((category, i) => {
      return (
        <div onClick={() => this.onComplete(category)} key={i} className="goButton">{category}</div>
      );
    });
    return (
      <div className="App">
        <UserCount roomname={this.props.roomname} />
        <div className="appQuestion">What are you in the mood for?</div>
        <div style={{ marginLeft: "32%" }}>{categories}</div>
        <br />
        <button onClick={() => this.props.updateCurrent('Price')} className="backButton"> Back</button>
      </div>
    );
  }
}

export default Price;

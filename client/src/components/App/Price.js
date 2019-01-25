import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Price extends Component {
  state = {
    data: null
  };

  onComplete(num){
    this.props.updateData('price',num)
    this.props.updateCurrent('Category')
  }

  goBack(){
    if (this.props.isOwner){
      this.props.updateCurrent("Location")
    }
    if (this.props.isOwner === false){
      this.props.updateCurrent("Code")
    }
  }

  render() {
    return (
      <div className="App">
        <div className="appCode"> GROUP CODE:<br/><i>{this.props.roomname}</i> </div>
        <div className="appRecommend">What's your price range?</div>

          <button onClick={()=>this.onComplete(1)} className="goButton">$</button>
          <br />
          <button onClick={()=>this.onComplete(2)} className="goButton">$$</button>
          <br />
          <button onClick={()=>this.onComplete(3)} className="goButton">$$$</button>
          <br />
          <button onClick={()=>this.onComplete(4)} className="goButton">$$$$</button>
          <br />
          <button onClick={()=>this.goBack()} className="backButton"> Back</button>
      </div>
    );
  }
}

export default Price;

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



  render() {
    return (
      <div className="App">
        <div className="appCode"> GROUP CODE:<br/><i>{this.props.code}</i> </div>
        <div className="appRecommend">What's your price range?</div>

          <button onClick={()=>this.onComplete(1)} className="goButton">$</button>
          <br />
          <button onClick={()=>this.onComplete(2)} className="goButton">$$</button>
          <br />
          <button onClick={()=>this.onComplete(3)} className="goButton">$$$</button>
          <br />
          <button onClick={()=>this.onComplete(4)} className="goButton">$$$$</button>
          <br />

        <Link to="/code">
          <button
            className="backButton"
            style={{ backgroundColor: "rgba(234, 72, 72, .8)" }}>
            <img className="containedButtonImg" src="/back.png" alt="" />
          </button>
        </Link>
      </div>
    );
  }
}

export default Price;

import React, { Component } from "react";

class Price extends Component {

  onComplete(num){
    this.props.updateData('price',num)
    this.props.updateCurrent('Category')
  }

  goBack() {
    this.props.updateCurrent('Wait')
  }
  // goBack(){
  //   if (this.props.isOwner){
  //     this.props.updateCurrent("Wait")
  //   }
  //   if (this.props.isOwner === false){
  //     this.props.updateCurrent("Wait")
  //   }
  // }

  render() {
    return (
      <div className="App">
        <div className="appQuestion">What's your price range?</div>
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

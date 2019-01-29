import React, { Component } from "react";

class Wait extends Component {

  onComplete(num){
    this.props.updateCurrent('Price')
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
      <div className="AppWait">
        <div className="appQuestion"> Group Created! <br /> <br />
          <div className="codeBanner">
            <img src="/redbanner.png" className="App-banner" alt="banner" />
            GROUP CODE: <br/><i>{this.props.roomname}</i> </div>
            <img src="/redbanner.png" className="App-banner" alt="banner" />
          <button onClick={()=>this.onComplete(1)} className="goButton">Continue</button>
          <br />
          <button onClick={()=>this.goBack()} className="backButton"> Back</button>
        </div>
      </div>
    );
  }
}

export default Wait;

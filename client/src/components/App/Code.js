import React, { Component } from "react";

class Code extends Component {
  state = {
    code: "****"
  };

  updateCode = e => {
    this.setState({
      code: e.target.value.toLowerCase()
    });
  };

  onComplete() {
    this.props.updateData("roomname", this.state.code);
    setTimeout(() => this.props.createUser(), 200);
  }

  render() {
    return (
      <div className="App">
        <div className="appQuestion">Enter your group code:</div>
        <input
          className="codeInput"
          type="text"
          placeholder={this.state.code}
          text={this.state.code}
          onChange={e => this.updateCode(e)}
        />
        <br />
        <button onClick={() => this.onComplete()} className="goButton">
          GO
        </button>
        <br />
        <button
          onClick={() => this.props.updateCurrent("Home")}
          className="backButton"
        >
          {" "}
          Back
        </button>
      </div>
    );
  }
}

export default Code;

import React, { Component } from "react";
import UserCount from "./UserCount";

class Loading extends Component {
  render() {
    return (
      <div className="App" style={{ textAlign: "center" }}>
        <UserCount roomname={this.props.roomname} />
        <div style={{ height: "200px" }} />
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
        <div className="contentMainHeader">Waiting for group members...</div>
      </div>
    );
  }
}

export default Loading;

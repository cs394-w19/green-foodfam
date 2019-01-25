import React, { Component } from "react";

class App extends Component {
  state = {
    location: "Evanston, IL"
  };

  updateLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  onComplete(){
    this.props.updateData('location',this.state.location)
    setTimeout(()=>this.props.createGroup(), 200)
  }

  render() {
    return (
      <div className="App">
        <div className="appQuestion">What's your location?</div>
        <input
          className="locationInput"
          type="text"
          placeholder={this.state.location}
          onChange={e => this.updateLocation(e)}
        />

        <br />
        <button onClick={()=>this.onComplete()} className="goButton">GO</button>
        <br />
        <button onClick={()=>this.props.updateCurrent('Home')} className="backButton"> Back</button>
      </div>
    );
  }
}

export default App;

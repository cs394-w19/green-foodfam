import React, { Component } from "react";
import Geosuggest from 'react-geosuggest';

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
        <div className="appQuestion">Enter your group's location:</div>
        < Geosuggest
            className="locationInput"
            onSuggestSelect={label => this.updateLocation(label)}
            />
            {/*
        // <input
        //   className="locationInput"
        //   type="text"
        //   placeholder={this.state.location}
        //   onChange={e => this.updateLocation(e)}
        // />
        */}

        <br />
        <button onClick={()=>this.onComplete()} className="goButton">Start</button>
        <br />
        <button onClick={()=>this.props.updateCurrent('Home')} className="backButton"> Back</button>
      </div>
    );
  }
}

export default App;

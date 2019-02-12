import React, { Component } from "react";
import Geosuggest from 'react-geosuggest';
import "./Geosuggest.css"

class App extends Component {
  state = {
    location: "Evanston, IL"
  };

  updateLocation(locname){
    this.state.location = locname.description
  }

  onComplete(){
    this.props.updateData('location',this.state.location)
    setTimeout(()=>this.props.createGroup(), 200)
  }

  render() {
    return (
      <div className="App">
        <div className="appQuestion">Enter your group's location:</div>
        <div className="locationInput">
        < Geosuggest
            className="locationInput"
            placeholder={this.state.location}
            onSuggestSelect={label => this.updateLocation(label)}
            country='us'
            />
          </div>
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

import React, { Component } from "react";
import "./App.css";
import { Link } from 'react-router-dom'

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <img src='/logo.png' className="App-logo" alt="logo" />
        <div className='appHeader'>FoodFam.</div>
        <input className='locationInput' type='text' placeholder='location...'/>
        <br/>
        <Link to='/price'>
          <button className='goButton'>GO</button>
        </Link>
      </div>
    );
  }
}

export default App;

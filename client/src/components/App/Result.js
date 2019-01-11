import React, { Component } from "react";
import "./App.css";
import Loading from './Loading'

class Result extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:null,
      APIsuccess:false
    }
  }

  componentWillMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
        console.log(res.express.selection)
        this.setState({ data: res.express.selection.name, APIsuccess:true })})
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/restaurant/select");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    if(this.state.APIsuccess){
      return (
        <div className="App">
          <div className='appRecommend'>We Recommend:</div>
          <div>{this.state.data}!</div>
        </div>
      );
    }
    else{
      return(<Loading/>)
    }
  }
}

export default Result;

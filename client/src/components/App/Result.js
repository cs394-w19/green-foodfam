import React, { Component } from "react";
import "./App.css";
import Loading from './Loading'
import { Link } from 'react-router-dom'

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
        this.setState({
          data: res.express.selection,
          APIsuccess:true,
          name:res.express.selection.name,
          image_url:res.express.selection.image_url,
          display_phone:res.express.selection.display_phone,
          phone:'tel:' + res.express.selection.phone,
          rating:res.express.selection.rating,
          url:res.express.selection.url,
          address1:res.express.selection.location.address1,
          city:res.express.selection.location.city,
          state:res.express.selection.location.state,
          zip_code:res.express.selection.location.zip_code
        })})
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
    var mapText = this.state.address1 + ' ' + this.state.city + ' ' + this.state.state + ' ' + this.state.zip_code
    var mapWithSpaces = mapText.replace(/ /g, "+");
    var mapURL = 'https://www.google.com/maps/place/' + mapWithSpaces

    const stars = Array.apply(null, { length: this.state.rating }).map((e, i) => (
                    <img key={i} src='/star.png' className='star' alt='star'/>
                  ));

    if(this.state.APIsuccess){
      return (
        <div className="App">
          <div className='appRecommend'>We Recommend:</div>
          <img src={this.state.image_url} className='restaurantPic' alt='yelp-pic'/>
          <div className='restName'>{this.state.name}</div>
          <div>{this.state.address1}</div>
          <div>{this.state.city}, {this.state.state} {this.state.zip_code}</div>
          <div>{stars}</div>
          <div className='buttonContainer'>
            <Link to='/'>
              <button className="containedButton" style={{backgroundColor:'rgba(234, 72, 72, .8)'}}>
                <img className='containedButtonImg' src='/back.png' alt=''/>
              </button>
            </Link>
            <a href={mapURL} target='_blank' rel="noopener noreferrer"><button className='containedButton' style={{backgroundColor:'rgba(66, 134, 244, .8)'}}>
              <img className='containedButtonImg' src='/directions.png' alt=''/>
            </button></a>
            <a href={this.state.phone}><button className="containedButton" style={{backgroundColor:'rgba(64, 229, 119, .8)'}}>
              <img className='containedButtonImg' src='/phone.png' alt=''/>
            </button></a>
          <a href={this.state.url} target='_blank' rel="noopener noreferrer"><button className="containedButton" style={{backgroundColor:'#fc8888'}}>
              <img className='containedButtonImg' src='/web.png' alt=''/>
            </button></a>
          </div>
        </div>
      );
    }
    else{
      return(<Loading/>)
    }
  }
}

export default Result;

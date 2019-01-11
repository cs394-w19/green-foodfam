import React, { Component } from "react";
import "./App.css";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import axios from "axios";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      APIsuccess: false
    };
  }

  componentWillMount() {
    // Example postRequest with data. Replace static with form input
    this.postRequest("/restaurant/select", {
      location: "San Francisco, CA"
    })
      .then(res => {
        const restaurant = res.selection;
        this.setState({
          data: restaurant,
          name: restaurant.name,
          image_url: restaurant.image_url,
          display_phone: restaurant.display_phone,
          phone: "tel:" + restaurant.phone,
          rating: restaurant.rating,
          url: restaurant.url,
          address1: restaurant.location.address1,
          city: restaurant.location.city,
          state: restaurant.location.state,
          zip_code: restaurant.location.zip_code,
          APIsuccess: true
        });
      })
      .catch(err => console.log(err));
  }

  postRequest = async (route, data = null) => {
    if (!data) {
      throw Error("Cannot send post request without data");
    } else {
      const res = await axios.post(route, data);

      if (res.status !== 200) {
        throw Error(res.message);
      }

      return res.data;
    }
  };

  getRequest = async route => {
    const res = await axios.get(route);
    if (res.status !== 200) {
      throw Error(res.message);
    }
    return res.data;
  };

  render() {
    var mapText =
      this.state.address1 +
      " " +
      this.state.city +
      " " +
      this.state.state +
      " " +
      this.state.zip_code;
    var mapWithSpaces = mapText.replace(/ /g, "+");
    var mapURL = "https://www.google.com/maps/place/" + mapWithSpaces;

    const stars = Array.apply(null, { length: this.state.rating }).map(
      (e, i) => <img key={i} src="/star.png" className="star" alt="star" />
    );

    if (this.state.APIsuccess) {
      return (
        <div className="App">
          <div className="appRecommend">We Recommend:</div>
          <img
            src={this.state.image_url}
            className="restaurantPic"
            alt="yelp-pic"
          />
          <div className="restName">{this.state.name}</div>
          <div>{this.state.address1}</div>
          <div>
            {this.state.city}, {this.state.state} {this.state.zip_code}
          </div>
          <div>{stars}</div>
          <div className="buttonContainer">
            <Link to="/">
              <button
                className="containedButton"
                style={{ backgroundColor: "rgba(234, 72, 72, .8)" }}
              >
                <img className="containedButtonImg" src="/back.png" alt="" />
              </button>
            </Link>
            <a href={mapURL} target="_blank" rel="noopener noreferrer">
              <button
                className="containedButton"
                style={{ backgroundColor: "rgba(66, 134, 244, .8)" }}
              >
                <img
                  className="containedButtonImg"
                  src="/directions.png"
                  alt=""
                />
              </button>
            </a>
            <a href={this.state.phone}>
              <button
                className="containedButton"
                style={{ backgroundColor: "rgba(64, 229, 119, .8)" }}
              >
                <img className="containedButtonImg" src="/phone.png" alt="" />
              </button>
            </a>
            <a href={this.state.url} target="_blank" rel="noopener noreferrer">
              <button
                className="containedButton"
                style={{ backgroundColor: "#fc8888" }}
              >
                <img className="containedButtonImg" src="/web.png" alt="" />
              </button>
            </a>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default Result;

import React, { Component } from "react";
import UserCount from "./UserCount";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount() {
    const restaurant = this.props.restData;
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
      zip_code: restaurant.location.zip_code
    });
  }

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

    return (
      <div className="App">
        <UserCount roomname={this.props.roomname} />
        <div className="appRecommend">Your Group's Recommendation:</div>
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
        <button
          onClick={() => this.props.updateCurrent("Home")}
          className="backButton"
        >
          Start Over
        </button>
      </div>
    );
  }
}

export default Result;

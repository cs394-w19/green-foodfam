import React, { Component } from "react";
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyANCZRnd0Y63ZRwk0--2Lm4x2RYrBuBrGk",
    authDomain: "foodfam-caf4c.firebaseapp.com",
    databaseURL: "https://foodfam-caf4c.firebaseio.com",
    projectId: "foodfam-caf4c",
    storageBucket: "foodfam-caf4c.appspot.com",
    messagingSenderId: "415459391792"
}

firebase.initializeApp(config);

class UserCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomname: this.props.roomname,
            count: 0
        }
    }

    countRef = firebase.database().ref("/data").child(this.props.roomname).child("count");

    componentDidMount() {
        this.countRef.on("value", snapshot => {
            this.setState({
                count: snapshot.val()
            }, error => { console.log(error) })
        })
    }

    render() {
        return (
            <div className="countContainer">
                <div className="countCircle">{this.state.count}</div>
                {Number(this.state.count) === 1 ?
                    <span className="countText"> person in group</span> :
                    <span className="countText"> people in group</span>}
            </div>);
    }
}

export default UserCount;
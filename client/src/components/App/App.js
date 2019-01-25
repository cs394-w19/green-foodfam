import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Code from './Code'
import Category from './Category'
import Location from './Location'
import Price from './Price'
import Result from './Result'
import Home from './Home'
import axios from "axios"

class App extends Component {
  state = {
    data: null,
    location: null,
    price:null,
    category:null,
    current:'Home',
    isOwner:null,
    name:'hello',
    roomname:null
  };

  updateLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  getRequest = async route => {
    const res = await axios.get(route);
    if (res.status !== 200) {
      throw Error(res.message);
    }
    return res.data;
  };

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

  createGroup() {
    // Example postRequest with data. Replace static with form input
    this.postRequest("/create/room", {
      location: this.state.location
    })
      .then(res => {
        const code = res.code;
        this.setState({
          roomname: code,
          current: 'Price',
          isOwner:true
        });
        this.createUser()
      })
      .catch(err => console.log(err));
  }

  createUser() {
    // Example postRequest with data. Replace static with form input
    this.postRequest("/create/user", {
      userName: this.state.name,
      roomName: this.state.roomname
    })
      .then(res => {
        console.log('API ran')
        if(this.state.isOwner){
          this.setState({
            current: 'Price'
          });
        }
        else{
          this.setState({
          current: 'Price',
          isOwner:false
        });
      }
      })
      .catch(err => console.log(err));
  }

  updatePreference(){
    this.postRequest("/update/preference",{
      userName: this.state.name,
      roomName: this.state.roomname,
      priceRange: this.state.price,
      category: this.state.category
    })
      .then(this.getResult())
      .catch((err)=> console.log(err))
  }

  getResult(){
    console.log('get result running')
    this.postRequest("/result",{
      roomName: this.state.roomname,
      isOwner: this.state.isOwner
    })
      .then(res => {
        if (res.done === false){
          console.log('false detected')
          setTimeout(()=>this.getResult(),10000)
        }
        else{
          console.log(res.result)
        }
      })
      .catch((err)=>console.log(err))
  }



  updateCurrent(cur){
    if (cur === 'Home'){this.setState({current:'Home'})}
    if (cur === 'Code'){this.setState({current:'Code'})}
    if (cur === 'Category'){this.setState({current:'Category'})}
    if (cur === 'Location'){this.setState({current:'Location'})}
    if (cur === 'Price'){this.setState({current:'Price'})}
    if (cur === 'Result'){this.setState({current:'Result'})}
  }

  updateData(name,value){
    this.setState({
      [name]:value
    })
  }

  render() {
    if (this.state.current === 'Home'){return(<Home updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} />)}
    if (this.state.current === 'Code'){return(<Code updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} createUser={()=>this.createUser()}/>)}
    if (this.state.current === 'Category'){return(<Category updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} updatePreference={()=>this.updatePreference()}/>)}
    if (this.state.current === 'Location'){return(<Location updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} createGroup={()=>this.createGroup()}/>)}
    if (this.state.current === 'Price'){return(<Price roomname={this.state.roomname} isOwner={this.state.isOwner} updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} />)}
    if (this.state.current === 'Result'){return(<Result updateCurrent={(cur)=>this.updateCurrent(cur)} />)}
  }
}

export default App;

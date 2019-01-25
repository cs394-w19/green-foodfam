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
    code:null,
    price:null,
    category:null,
    current:'Home'
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
          code: code,
          current: 'Price'
        });
      })
      .catch(err => console.log(err));
  }

  updateCurrent(cur){
    console.log(cur)
    if (cur === 'Home'){this.setState({current:'Home'})}
    if (cur === 'Code'){this.setState({current:'Code'})}
    if (cur === 'Category'){this.setState({current:'Category'})}
    if (cur === 'Location'){this.setState({current:'Location'})}
    if (cur === 'Price'){this.setState({current:'Price'})}
    if (cur === 'Result'){this.setState({current:'Result'})}
  }

  updateData(name,value){
    console.log(name,value,this.state)
    this.setState({
      [name]:value
    })
  }

  render() {
    if (this.state.current === 'Home'){return(<Home updateCurrent={(cur)=>this.updateCurrent(cur)} />)}
    if (this.state.current === 'Code'){return(<Code updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} />)}
    if (this.state.current === 'Category'){return(<Category updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} />)}
    if (this.state.current === 'Location'){return(<Location updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} createGroup={()=>this.createGroup()}/>)}
    if (this.state.current === 'Price'){return(<Price code={this.state.code} updateCurrent={(cur)=>this.updateCurrent(cur)} updateData={(name,value)=>this.updateData(name,value)} />)}
    if (this.state.current === 'Result'){return(<Result updateCurrent={(cur)=>this.updateCurrent(cur)} />)}
  }
}

export default App;

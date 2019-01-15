import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import Location from "./components/App/Location.js";
import Code from "./components/App/Code.js";
import Price from "./components/App/Price";
import Category from "./components/App/Category";
import { BrowserRouter, Route } from "react-router-dom";
import Result from "./components/App/Result";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/location" component={Location} />
        <Route exact path="/code" component={Code} />
        <Route exact path="/price" component={Price} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/result" component={Result} />
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("root")
);

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Register from "./Register";
import Home from "../Home/Home";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "login",
      username: "",
      isLoading: false,
      code_button_text: "发送验证码",
      code_button_disable: false,
    };
  }
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/home" component={Home}></Route>
        </Router>
      </div>
    );
  }
}

export default Index;

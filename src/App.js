import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Index from "./components/Login/Index";
import Home from "./components/Home/Home";
import PrivateRouter from "./components/privateRouter/index";
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <Index />} />
      <PrivateRouter component={Home} path="/home" />
    </BrowserRouter>
  );
}

export default App;

import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import PrivateRouter from "../privateRouter/index";
import Console from "./Console";
import UserAdd from "./users/UserAdd";
import UserList from "./users/UserList";
import departmentAdd from "./department/departmentAdd";
import departmentList from "./department/departmentList";
import router from "../../router";
export default class contentMain extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={UserList} path="/home/user/list" />
        <Route exact component={UserAdd} path="/home/user/add" />
        <Route exact component={departmentAdd} path="/home/department/add" />
        <Route exact component={departmentList} path="/home/department/list" />
      </Switch>
    );
  }
}

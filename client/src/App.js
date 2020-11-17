import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Profile from './components/pages/profile/Profile'



import { Provider } from "react-redux";
import store from "./store";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App1.css";

const App = () => {
  useEffect(() => M.AutoInit()); //eslint-disable-next-line);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Fragment>
        <Alerts />
          <Switch>
            <PrivateRoute exact path="/" component={Home}></PrivateRoute>
            <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

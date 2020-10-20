import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/auth/Login';
import Home from './components/pages/Home';



import './App.css';

const App = () => {
  return (
    <div className="card">
      <Router>
            <Fragment>
              <div className="container">
                <Switch>
                <Route exact path="/" component={Home}></Route>

                  <Route exact path="/login" component={Login}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
    </div>
  );
}
//<PrivateRoute exact path="/" component={Home}></PrivateRoute> for later

export default App;

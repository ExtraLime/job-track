import React, { useEffect,Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { loadUser } from './actions/authActions'
import Home from './components/pages/Home';
import PrivateRoute from './components/routing/PrivateRoute'
import { Provider } from 'react-redux';
import store from './store'
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";




import './App1.css';

const App = () => {
  useEffect(() => M.AutoInit())//eslint-disable-next-line);
  

  return (
    <Provider store={store}>
      <Router>
            <Fragment>              
                <Switch>
                <PrivateRoute exact path="/" component={Home}></PrivateRoute> 
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/register" component={Register}></Route>

                </Switch>           
            </Fragment>
          </Router>
    </Provider>
  );
}
//<PrivateRoute exact path="/" component={Home}></PrivateRoute> for later

export default App;

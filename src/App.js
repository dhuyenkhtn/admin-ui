import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { PrivateRoute } from './_components';
import {history} from './_helpers/history';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/register"
              name="Register New User - Email Token Management System"
              render={props => <Register {...props} />}
            />
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <PrivateRoute path="/" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;

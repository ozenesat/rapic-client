import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import Home from './Home';
import Deneme from './Deneme';
import Layout from './layout'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

// ! --- user auth imports --- ! \\
import AuthenticatedRoute from './layout/components/AuthenticatedRoute/AuthenticatedRoute'
import SignUp from './layout/components/Auth/SignUp'
import SignIn from './layout/components/Auth/SignIn'
import SignOut from './layout/components/Auth/SignOut'
import ChangePassword from './layout/components/Auth/ChangePassword'

// find a way to define and set user here and pass it into related components like
// <AuthenticatedRoute user={user} path='/change-password' render={() => (
//             <ChangePassword msgAlert={this.msgAlert} user={user} />
//           )} />
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/deneme'} component={Deneme} />
          <Route path={'/sign-up'} component={SignUp} />
          <Route path={'/sign-in'} component={SignIn} />
          <AuthenticatedRoute path={'/change-password'} component={ChangePassword} />
          <AuthenticatedRoute path={'/sign-out'} component={SignOut}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

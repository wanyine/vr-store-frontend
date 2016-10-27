import React from 'react';
import { Route, IndexRoute, withRouter } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import auth from './http/auth';
import LoginPage from './containers/LoginPage'
import DataPage from './containers/DataPage'
import {Link} from 'react-router'


function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


const Login = withRouter(LoginPage);

const Logout = withRouter(React.createClass({
  componentWillMount(){
    auth.logout()
    const {router} = this.props
    router.replace('/')

  },

  render(){
    return (
        <h2>
        <Link to="/login">please login first</Link>
        </h2>
    
    )
  }
}))

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} onEnter={requireAuth}/>
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="data" component={DataPage} />
  </Route>
);

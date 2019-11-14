import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from './Home'
import Login from './Login'
import GithubCallback from './GithubCallback'
import NotFound from './NotFound'
import axios from 'axios'
import './styles/styles.scss'

export default () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/github/callback" component={GithubCallback} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

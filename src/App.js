import React, { Component } from 'react'
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import LogIn from './components/LogIn'
import Dashboard from './components/Dashboard'
import report from './components/Report.js'
import IncidentReport from './components/IncidentReport.js'
import RegisterVolunteer from './components/RegisterVolunteer';
import Users from './components/Users.js'

export class App extends Component {
  render() {
    return (

      <BrowserRouter>

        <div className = "App">
          <Switch>
            <Route exact path='/' component={LogIn} />
            <Route  path='/login' component={LogIn} />
            <Route  path='/register' component={LogIn} />
            <Route  path='/dashboard' component={Dashboard} />
            <Route  path='/report' component={report} />
            <Route  path='/users' component={Users} />
            <Route  path='/IncidentReport' component={IncidentReport} />
            <Route  path='/RegisterVolunteer' component={RegisterVolunteer} />
          </Switch>
        </div>

      </BrowserRouter>
    )
  }
}

export default App

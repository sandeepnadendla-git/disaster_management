import React, { Component } from 'react'
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import LogIn from './components/LogIn'
import Dashboard from './components/Dashboard'
import report from './components/Report.js'

export class App extends Component {
  render() {
    return (

      <BrowserRouter>

        <div className = "App">
          <Switch>
            <Route exact path='/' component={LogIn} />
            <Route  path='/login' component={LogIn} />
            <Route  path='/dashboard' component={Dashboard} />
            <Route  path='/report' component={report} />
            
          </Switch>
        </div>

      </BrowserRouter>
    )
  }
}

export default App

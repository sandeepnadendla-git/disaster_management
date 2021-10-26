import React, { Component } from 'react'
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import LogIn from './LogIn'
import Dashboard from './Dashboard'

export class App extends Component {
  render() {
    return (

      <BrowserRouter>

        <div className = "App">
          <Switch>
            <Route exact path='/' component={LogIn} />
            <Route  path='/login' component={LogIn} />
            <Route  path='/dashboard' component={Dashboard} />
            
          </Switch>
        </div>

      </BrowserRouter>
    )
  }
}

export default App

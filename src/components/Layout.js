import React from 'react'
import {NavLink} from 'react-router-dom'
import { Redirect } from "react-router-dom"

function Layout() {
    if(document.cookie.split("; ").find(row => row.startsWith('ls=')).split("=")[1]=="1"){
      return (

        <div>
            <ul className='ulLayout'>
                
                <NavLink exact to ="/Dashboard" className="main-Nav" activeClassName = "main-nav-active"><li><a>Home</a></li></NavLink>
                <NavLink  exact to ="/Report" className="main-Nav" activeClassName = "main-nav-active"><li><a>Reports</a></li></NavLink>
                <NavLink  exact to ="/incidentreport" className="main-Nav" activeClassName = "main-nav-active"><li><a>Report Incident</a></li></NavLink>
                <NavLink  exact to ="/RegisterVolunteer" className="main-Nav" activeClassName = "main-nav-active"><li ><a>Register Volunteer</a></li></NavLink>
                <NavLink  exact to ="/users" className="main-Nav" activeClassName = "main-nav-active"><li><a href="/users">Users</a></li></NavLink>
                <li style={{ float: 'right' }}><a class="active" href="/login">Log Out</a></li>
            </ul>
        </div>

    )
      }
    else{
      
      //const navigateTo = () => history.push('/login');//eg.history.push('/login');
      return (
        <Redirect to='/login' />
       );
    }
  }


export default Layout

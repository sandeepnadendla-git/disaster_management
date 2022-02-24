import React from 'react';
import "../css/Dashboard.css";
import Layout from './Layout';
import { Redirect } from "react-router-dom";

function Dashboard() {
  if(document.cookie.split("; ").find(row => row.startsWith('ls=')).split("=")[1]=="1"){
    return (
      <Layout></Layout>
    )
    }
  else{
    
    //const navigateTo = () => history.push('/login');//eg.history.push('/login');
    return (
      <Redirect to='/login' />
     );
  }
}

export default Dashboard

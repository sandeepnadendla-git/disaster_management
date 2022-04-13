import React, { useState, useEffect } from 'react'
import "../css/Dashboard.css";
import { analytics } from '../firebase';
import { collection, query, orderBy, onSnapshot, limit, getFirestore } from "@firebase/firestore";
import { Redirect } from "react-router-dom";

function Dashboard() {
  const [reportsDB, setReports] = useState([])
  useEffect(() => {
    const q = query(collection(analytics, 'reportsDB'), orderBy('timedate', 'desc'), limit(3))
    onSnapshot(q, (querySnapshot) => {
      setReports(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    })
  }, [])
  if (reportsDB.length!=0) {
    return (
      <div className='dash'>
        {/* <Layout></Layout> */}

        <div class="container">
          <div class="header-wrapper">
            <div class="logo"></div>
            <ul class="nav1">
              <li><a href="/report">Reports</a></li>
              <li><a href="/IncidentReport">Report Incident</a></li>
              <li><a href="/RegisterVolunteer">Register Volunteer</a></li>
              <li><a href="/users">users</a></li>
              <li><a href="/login">Log Out</a></li>
            </ul>
            <div class="title">Welcome back, Admin!</div>
            <div class="note"> <span class="focus">CERT WEB Application </span></div>


          </div>

          <div class="content-wrapper">
            <div class="table-wrapper">
              <ul class="horizontal col header">
                <li class="content">Payoff Date</li>
                <li class="content">Payee</li>
                <li class="content ">Description</li>
                <li class="content right">Remaining</li>
              </ul>
              <ul class="data col horizontal">
                <li class="content">
                  <div>{reportsDB[0].title}</div>
                  <div class="secondary">4 months</div>
                </li>
                <li class="content has-image">
                  <div>Best Buy</div>
                  <div class="secondary">Best Buy, LLC.</div>
                </li>
                <li class="content">
                  <div>Washer & Dryer</div>
                  <div class="secondary">Promotional Exp: 10/20/17</div>
                </li>
                <li class="content">
                  <div>$250</div>
                  <div class="secondary">2%</div>
                </li>
                <li class="content">
                  <div class="icon-wrapper">
                    <span class="icon edit" data-tooltip="Edit"></span><span class="icon delete" data-tooltip="Delete"></span></div>

                </li>
              </ul>
              <ul class="data col horizontal">
                <li class="content">
                  <div>{reportsDB[1].title}</div>
                  <div class="secondary">6 months</div>
                </li>
                <li class="content has-image">
                  <div>Chase Auto</div>
                  <div class="secondary">JP Morgan Chase Bank</div>
                </li>
                <li class="content">
                  <div>Scion TC '12</div>
                  <div class="secondary">5 year loan</div>
                </li>
                <li class="content">
                  <div>$8,9120</div>
                  <div class="secondary">80%</div>
                </li>
                <li class="content">
                  <div class="icon-wrapper">
                    <span class="icon edit" data-tooltip="Edit"></span><span class="icon delete" data-tooltip="Delete"></span></div>

                </li>
              </ul>
              <ul class="data col horizontal">
                <li class="content">
                  <div>{reportsDB[2].title}</div>
                  <div class="secondary">8 months</div>
                </li>
                <li class="content has-image">
                  <div>Macy's</div>
                  <div class="secondary">Macy's Inc.</div>
                </li>
                <li class="content">
                  <div>Couch</div>
                  <div class="secondary">Promotional Exp: 3/8/17</div>
                </li>
                <li class="content">
                  <div>$1,080</div>
                  <div class="secondary">19%</div>
                </li>
                <li class="content">

                  <div class="icon-wrapper">
                    <span class="icon edit" data-tooltip="Edit"></span><span class="icon delete" data-tooltip="Delete"></span></div>


                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else{
    return(
      <div></div>
    )
  }




}

export default Dashboard

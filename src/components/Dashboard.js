import React, { useState, useEffect } from 'react'
import "../css/Dashboard.css";
import { analytics } from '../firebase';
import { collection, query, orderBy, onSnapshot, limit, where } from "@firebase/firestore";
import Layout from './Layout';
import '../css/report.css';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import '@progress/kendo-theme-default/dist/all.css';
import moment from 'moment';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('userDetails'));
  console.log(user);

  const [reportsDB, setReports] = useState([])
  useEffect(() => {
    const q = query(collection(analytics, 'reportsDB'), orderBy('timedate', 'desc'), limit(10));
    onSnapshot(q, (querySnapshot) => {
      setReports(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    })
  }, []);
  const [reportCount, setCounts] = useState([])
  useEffect(() => {
    const q = query(collection(analytics, 'reportsDB'), orderBy('timedate', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setCounts(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    })
  }, []);

  const activeCount = reportCount.filter(e => e.isActive == 1).length;
  const closedCount = reportCount.filter(e => e.isActive == 0).length;

  var stateReport = [];
  reportCount.forEach(x => {
      if (stateReport.some((val) => { return val['state'] == x['state'] })) {
        stateReport.forEach((k) => {
          if (k['state'] === x['state']) {
            k["count"]++
          }
        })
      } else {
        let a = {}
        a['state'] = x['state']
        a["count"] = 1
        stateReport.push(a);
      } 
  })

  var colorCount = {
    'Red': 0,
    'Yellow': 0,
    'Black': 0,
    'Green': 0,
  };
  reportCount.forEach(color => {
      if(color['red'] != "") {
        colorCount['Red'] = colorCount['Red'] + parseInt(color['red']);
      }
      if(color['black'] != "") {
        colorCount['Black'] = colorCount['Black'] + parseInt(color['black']);
      }   
      if(color['yellow'] != "") {
        colorCount['Yellow'] = colorCount['Yellow'] + parseInt(color['yellow']);
      }   
      if(color['green'] != "") {
        colorCount['Green'] = colorCount['Green'] + parseInt(color['green']);
      }         
  });

  if (reportsDB.length != 0) {
    return (
      <div className='dash'>
        <div class="container1">
          <div class="header-wrapper">
            <div class="logo"></div>
            <Layout></Layout>
            <div class="title">Welcome back, {user}!</div>
            <div class="note"> <span class="focus">CERT WEB Application</span></div>
            <div class="stats">
              <table>
                <tr>
                  <td>Active Incidents </td>
                  <td>: {activeCount}</td>
                </tr>
                <tr>
                  <td>Closed Incidents </td>
                  <td>: {closedCount}</td>
                </tr>
              </table>
            </div>
            <div class="colorStatsDiv">
              <table class="colorStats">
                <tr>
                  <td class="default">Total Casualities :</td>
                  <td class="red">Red</td>
                  <td class="red">{colorCount['Red']}</td>
                  <td class="yellow">Yellow</td>
                  <td class="yellow">{colorCount['Yellow']}</td>
                  <td class="black">Black</td>
                  <td class="black">{colorCount['Black']}</td>
                  <td class="green">Green</td>
                  <td class="green">{colorCount['Green']}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="grid-container">
            <div class="recentReports grid-child">
              <h5>Most Recent Incidents</h5>
              <Grid data={filterBy(reportsDB)}>
                <GridColumn field="title" title="Title" />
                <GridColumn field="location" title="Location" />
                <GridColumn field="timedate" title="Report Date"
                  cell={props => (
                    <td>  {moment(props.dataItem[props.field]).format("LLL")} </td>
                  )} />
              </Grid>
            </div>
            <div class="recentReports grid-child">
              <h5>Incidents count by State</h5>
              <Grid data={filterBy(stateReport)}>
                <GridColumn field="state" title="State" />
                <GridColumn field="count" title="Count" />
              </Grid>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }




}

export default Dashboard

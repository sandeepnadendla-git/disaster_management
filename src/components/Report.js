import React, { useState, useEffect } from 'react'
import '../css/report.css'
import Layout from './Layout'
import JsonData from './d.json'
import axios from "axios"
//const apiBaseUrl = "http://localhost:5051/";
const apiBaseUrl = "https://disaster-backend.herokuapp.com/";


function Report() {
  var DisplayData;
  const [count, setCount] = useState(0);  
  useEffect(async () => {
    await axios.get(apiBaseUrl + "api/v2/IncidentReports")
      .then(function (response) {
        if (response.status == 208) {
          DisplayData = '<h1>N/A</h1>';
          alert("Email already exists please try with different email");
        } else {

          DisplayData = response.data.map(
            (info) => {
              return (
                <tr>
                  <td>{info.reportID}</td>
                  <td>{info.address}</td>
                  <td>{info.city}</td>
                  <td>{info.state}</td>
                  <td>{info.zip}</td>
                  <td>{info.longitude}</td>
                  <td>{info.latitude}</td>
                  <td>{info.images}</td>
                  <td>{info.casuality}</td>
                  <td>{info.sDamage}</td>
                  <td>{info.fire}</td>
                  <td>{info.hazmat}</td>
                  <td>{info.other}</td>
                </tr>
              )
            }
          )
          setCount(DisplayData)
        }
      }
      )
  })

  return (
    <div>
      <Layout></Layout>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Sr.NO</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Images</th>
            <th>Casuality</th>
            <th>Structural Damage</th>
            <th>Fire</th>
            <th>Hazmat</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody id='Jdata'>
         {count}


        </tbody>
      </table>

    </div>

  )
}

export default Report

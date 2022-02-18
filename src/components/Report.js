import React, { useState, useEffect } from 'react'
import '../css/report.css'
import Layout from './Layout'
import { collection, query, orderBy, onSnapshot, getFirestore } from "firebase/firestore"
import { analytics } from '../firebase'



function Report() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [reportsDB, setReports] = useState([])
  useEffect(() => {
    const q = query(collection(analytics, 'reportsDB'), orderBy('timedate', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setReports(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  return (
    <div>
      <Layout></Layout>
      <div className='outerDivTable'>
        <table class="table">
          <thead>
            <th>title</th>
            <th>typeOfIncident</th>
            <th>description</th>
            <th>red</th>
            <th>yellow</th>
            <th>black</th>
            <th>green</th>
            <th>hazmatType</th>
            <th>structuralDamageImpact</th>
            <th>imageURL</th>
            <th>impactLevel</th>
            <th>Address</th>
            <th>zipCode</th>
            <th>incidentId</th>
            <th>latitude</th>
            <th>location</th>
            <th>longitude</th>
            <th>notes</th>
            <th>state</th>
            <th>timedate</th>
            <th>updatedAt</th>
            <th>userName</th>
          </thead>
          <tbody id='Jdata'>
            {reportsDB.map((report) => (


              <tr>

                <td>{report.data.title}</td>
                <td>{report.data.typeOfIncident}</td>
                <td>{report.data.description}</td>
                <td>{report.data.red}</td>
                <td>{report.data.yellow}</td>
                <td>{report.data.black}</td>
                <td>{report.data.green}</td>
                <td>{report.data.hazmatType}</td>
                <td>{report.data.structuralDamageImpact}</td>
                <td><a href={report.data.imageURL}>
                  <img src={report.data.imageURL} alt={report.data.imageURL} className="imgClss"></img>
                  <div className ="dropdown-content">
                    <img src={report.data.imageURL} alt={report.data.imageURL} width="300" height="200"></img>
                  </div>
                </a></td>
                <td>{report.data.impactLevel}</td>
                <td>{report.data.incidentId}</td>
                <td>{report.data.address}</td>
                <td>{report.data.zipCode}</td>
                <td>{report.data.latitude}</td>
                <td>{report.data.location}</td>
                <td>{report.data.longitude}</td>
                <td>{report.data.notes}</td>
                <td>{report.data.state}</td>
                <td>{report.data.timedate}</td>
                <td>{report.data.updatedAt}</td>
                <td>{report.data.userName}</td>
              </tr>

            ))}


          </tbody>
        </table>
      </div>
    </div>




  )
}

export default Report

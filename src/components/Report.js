import React, { useState, useEffect } from 'react'
import '../css/report.css'
import Layout from './Layout'
import { collection, query, orderBy, onSnapshot, getFirestore } from "firebase/firestore"
import { analytics } from '../firebase'
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import '@progress/kendo-theme-default/dist/all.css';



function Report() {
  const initialFilter = {
    logic: "and",
    filters: [
      {
        field: "firstName",
        operator: "contains",
        value: "",
      },
    ],
  };
  const [filter, setFilter] = React.useState(initialFilter);
  const [openAddModal, setOpenAddModal] = useState(false)
  const [reportsDB, setReports] = useState([])
  useEffect(() => {
    const q = query(collection(analytics, 'reportsDB'), orderBy('timedate', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setReports(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
  }, [])

  return (
    <div>
      <Layout></Layout>
      <div className='outerDivTable'>
      <Grid
          style={{
            height: "525px",
            width: "5000px",
          }}
          data={filterBy(reportsDB, filter)}
          filterable={true}
          filter={filter}
          onFilterChange={(e) => setFilter(e.filter)}
        >
          <GridColumn field="title"  minWidth="1000px" title="title" />

          <GridColumn field="lastName" title="lastName" />
          <GridColumn field="incidentId" title="incidentId" />
          <GridColumn field="typeOfIncident" title="typeOfIncident" />
          <GridColumn field="description" title="streetAddress" />
          <GridColumn field="red" title="red" />
          <GridColumn field="yellow" title="yellow" />
          <GridColumn field="black" title="black" />
          <GridColumn field="green" title="green" />
          <GridColumn field="hazmatType" title="hazmatType" />
          <GridColumn field="structuralDamageImpact" title="structuralDamageImpact" />
          {/* <GridColumn field="none" title="none" /> */}
          <GridColumn field="impactLevel" title="impactLevel" />
          <GridColumn field="address" title="address" />
          <GridColumn field="location" title="location" />
          <GridColumn field="state" title="state" />
          <GridColumn field="zipCode" title="zipCode" />
          <GridColumn field="latitude" title="latitude" />
          <GridColumn field="longitude" title="longitude" />
          <GridColumn field="timedate" title="timedate" />
          <GridColumn field="updatedAt" title="updatedAt" />
          <GridColumn field="userName" title="userName" />
        </Grid>
        );
               
                              
                {/* <td><a href={report.data.imageURL}>
                  <img src={report.data.imageURL} alt={report.data.imageURL} className="imgClss"></img>
                  <div className ="dropdown-content">
                    <img src={report.data.imageURL} alt={report.data.imageURL} width="300" height="200"></img>
                  </div>
                </a></td> */}
     
      </div>
    </div>




  )
}

export default Report

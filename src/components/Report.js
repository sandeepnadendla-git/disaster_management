import React, { useState, useEffect } from 'react'
import '../css/report.css'
import Layout from './Layout'
import { collection, query, orderBy, onSnapshot, getFirestore } from "firebase/firestore"
import { analytics } from '../firebase'
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import '@progress/kendo-theme-default/dist/all.css';
import { DatePicker } from "@progress/kendo-react-dateinputs";
import moment from 'moment'



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
            height: "450px",
            width: "5000px",
          }}
          data={filterBy(reportsDB, filter)}
          filterable={true}
          filter={filter}
          onFilterChange={(e) => setFilter(e.filter)}
        >
          <GridColumn field="title" minWidth="1000px" title="Title" />

          <GridColumn field="incidentId" title="Incident ID" />
          <GridColumn field="typeOfIncident" title="Type Of Incident" />
          <GridColumn field="description" title="Description" />
          <GridColumn field="red" title="Red" />
          <GridColumn field="yellow" title="Yellow" />
          <GridColumn field="black" title="Black" />
          <GridColumn field="green" title="Green" />
          <GridColumn field="hazmatType" title="Hazmat Type" />
          <GridColumn field="structuralDamageImpact" title="Structural Damage Level" />
          <GridColumn field="imageURL" title="Image" cell={props => (
            <td>
              <a href={props.dataItem[props.field]}>
                <img src={props.dataItem[props.field]} alt={props.dataItem[props.field]} className="imgClss"></img>
              </a>
            </td>

          )} />
          <GridColumn field="impactLevel" title="Impact Level" />
          <GridColumn field="address" title="Address" />
          <GridColumn field="location" title="Location" />
          <GridColumn field="state" title="State" />
          <GridColumn field="zipCode" title="Zipcode" />
          <GridColumn field="latitude" title="Latitude" />
          <GridColumn field="longitude" title="Longitude" />
          <GridColumn field="timedate" title="Date" cell={props => (
            <td>
              
               {moment(props.dataItem[props.field]).format("LLL")}
             
            </td>

          )} />
          <GridColumn field="updatedAt" title="UpdatedAt" cell={props => (
            <td>
              
               {moment(props.dataItem[props.field]).format("LLL")}
             
            </td>

          )}/>
          <GridColumn field="userName" title="User Name" />
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

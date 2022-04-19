import React, { useState, useEffect } from 'react';
import '../css/report.css';
import Layout from './Layout';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore"
import { analytics } from '../firebase';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from 'react-bootstrap';
import { filterBy } from "@progress/kendo-data-query";
import { DropdownFilterCell } from "./dropdownFilterCell";
import '@progress/kendo-theme-default/dist/all.css';
import moment from 'moment';
import { Window,Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";


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
  var [rowData, setRowData] = useState([])
  var [indexID, setIndexID] = useState([])
  const typeOfIncidentfilt = [ "Earthquakes" , "Floods" ,   "Tornadoes" ,   "Severe Storms" ,   "Tropical Storms" ,   "Thunderstorms" ,
   "Tropical cyclone" ,   "Hailstorms" ,   "Others" ,]
  useEffect(() => {
    const q = query(collection(analytics, 'reportsDB'), orderBy('timedate', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setReports(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })))     
    })
  }, [])


  const [visible, setVisible] = React.useState(false);
  const [visibleWindow, setVisibleWindow] = React.useState(false);

  async function updateIncStatus() {
    console.log(indexID);
    const userDoc = doc(analytics, "reportsDB", indexID);
    const newFields = { isActive: 0 };
   await  updateDoc(userDoc, newFields);
   setVisible(!visible)
  }

   function closeIncident(id) {
    console.log(id)
    
   
   setIndexID(id);
    setVisible(!visible);
  }

  function viewIncident(row) {
    setRowData({ ...row });
    setIndexID(row.id);
    setVisibleWindow(!visibleWindow);
  }
  const typeOfIncidentfiltCell = (props) => (
    <DropdownFilterCell
      {...props}
      data={typeOfIncidentfilt}
      defaultItem={"Select category"}
    />
  );
  return (
      <div>
        <Layout></Layout>
        <div className='outerDivTable'>
          <Grid
           style={{
            height: "525px",
          }}
          
            data={filterBy(reportsDB, filter)}
            filterable={true}
            filter={filter}
            onFilterChange={(e) => setFilter(e.filter)}
          >
            <GridColumn field="view" width="150px" title="View" filterable={false} cell={props => (
              <td>
                <Button variant="success" id="viewReport" onClick={() => viewIncident(props.dataItem)}>
                        View Incident
                </Button>
              </td>
              )} 
            />

            <GridColumn field="title" minWidth="1000px" title="Title" />

            <GridColumn field="incidentId" title="Incident ID" />
            <GridColumn field="typeOfIncident" title="Type Of Incident"  filterCell={typeOfIncidentfiltCell} />
            <GridColumn field="description" title="Description"/>
            {/* <GridColumn field="isActive" width="100px" title="Is Active ?" /> */}
            <GridColumn field="location" title="Location" />
            <GridColumn field="state" title="State" />
            {/* <GridColumn field="red" title="Red" />
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
            <GridColumn field="timedate" title="Report Date" cell={props => (
              <td>
                
                {moment(props.dataItem[props.field]).format("LLL")}
              
              </td>

            )} />
            <GridColumn field="updatedAt" title="Updated Date" cell={props => (
              <td>
                
                {moment(props.dataItem[props.field]).format("LLL")}
              
              </td>

            )}/> */}
            <GridColumn field="timedate" title="Report Date" cell={props => (
              <td>
                
                {moment(props.dataItem[props.field]).format("LLL")}
              
              </td>

            )} />
            <GridColumn field="userName" title="User Name" />
            <GridColumn field="close" width="120px" title="Close Incident" filterable={false} cell={props => (
              <td>
                <Button variant="danger" id="close" disabled={props.dataItem.isActive==0} onClick={() => closeIncident(props.dataItem.id)} >
                {props.dataItem.isActive==0 ? "Closed" : "Close"}
                </Button>
              </td>
              )} 
            />
          </Grid>


          {/* <td><a href={report.data.imageURL}>
                    <img src={report.data.imageURL} alt={report.data.imageURL} className="imgClss"></img>
                    <div className ="dropdown-content">
                      <img src={report.data.imageURL} alt={report.data.imageURL} width="300" height="200"></img>
                    </div>
                  </a></td> */}

        </div>
        { visible && (
        <Dialog title={"Please confirm"} onClose={() => setVisible(!visible)}>
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            Are you sure you want to close this incident?
          </p>
          <DialogActionsBar>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={() => setVisible(!visible)}
            >
              No
            </button>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={() => updateIncStatus()}
            >
              Yes
            </button>
          </DialogActionsBar>
        </Dialog>
        )} 

        { visibleWindow && (
        <Window title={"Incident Details"} onClose={() => setVisibleWindow(!visibleWindow)} initialHeight={700} initialWidth={700} >
          <form className="k-form" >
            <fieldset>
              <legend>{rowData.title}</legend>
              <table id="incTable">
                <tbody>
                <tr>
                  <td><b>Title</b></td>
                  <td><span>{rowData.title}</span></td>
                </tr>
                <tr>
                  <td><b>Incident ID</b></td>
                  <td><span>{rowData.incidentId}</span></td>
                </tr>
                <tr>
                  <td><b>Type Of Incident</b></td>
                  <td><span>{rowData.typeOfIncident}</span></td>
                </tr>
                <tr>
                  <td><b>Description</b></td>
                  <td><span>{rowData.description}</span></td>
                </tr>
                {/* <tr>
                  <td><b>Is Active?</b></td>
                  <td><span>{rowData.isActive + ""}</span></td>
                </tr> */}
                <tr>
                  <td><b>Red</b></td>
                  <td><span>{rowData.red}</span></td>
                </tr>
                <tr>
                  <td><b>Yellow</b></td>
                  <td><span>{rowData.yellow}</span></td>
                </tr>
                <tr>
                  <td><b>Black</b></td>
                  <td><span>{rowData.black}</span></td>
                </tr>
                <tr>
                  <td><b>Green</b></td>
                  <td><span>{rowData.green}</span></td>
                </tr>
                <tr>
                  <td><b>Hazmat Type</b></td>
                  <td><span>{rowData.hazmatType}</span></td>
                </tr>
                <tr>
                  <td><b>Structural Damage Level</b></td>
                  <td><span>{rowData.structuralDamageImpact}</span></td>
                </tr>
                <tr>
                  <td><b>Image</b></td>
                  <td>
                      <a href={rowData.imageURL}>
                      <img src={rowData.imageURL} alt={rowData.imageURL} className="imgClss"></img>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td><b>Impact Level</b></td>
                  <td><span>{rowData.impactLevel}</span></td>
                </tr>
                <tr>
                  <td><b>Address</b></td>
                  <td><span>{rowData.address}</span></td>
                </tr>
                <tr>
                  <td><b>Location</b></td>
                  <td><span>{rowData.location}</span></td>
                </tr>
                <tr>
                  <td><b>State</b></td>
                  <td><span>{rowData.state}</span></td>
                </tr>
                <tr>
                  <td><b>Zip Code</b></td>
                  <td><span>{rowData.zipCode}</span></td>
                </tr>
                <tr>
                  <td><b>Latitude</b></td>
                  <td><span>{rowData.latitude}</span></td>
                </tr>
                <tr>
                  <td><b>Longitude</b></td>
                  <td><span>{rowData.longitude}</span></td>
                </tr>
                <tr>
                  <td><b>Report Date</b></td>
                  <td><span>{rowData.timedate}</span></td>
                </tr>
                <tr>
                  <td><b>Updated Date</b></td>
                  <td><span>{rowData.updatedAt}</span></td>
                </tr>
                <tr>
                  <td><b>User Name</b></td>
                  <td><span>{rowData.userName}</span></td>
                </tr>
                </tbody>
              </table>

            </fieldset>

            <div id="text-right">
              <span>
                <button
                  type="button"
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  onClick={() => setVisibleWindow(!visibleWindow)}
                >
                  Cancel
                </button>
              </span>
              <span>
                <button
                  type="button"
                  disabled={!rowData.isActive}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                  onClick={() => closeIncident(indexID)}
                >
                  Close Incident
                </button>
              </span>
            </div>
          </form>
        </Window>
      )}

      </div>
    )
  
}

export default Report
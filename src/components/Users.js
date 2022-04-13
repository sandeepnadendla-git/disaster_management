import React, { useState, useEffect } from 'react'
//import { Redirect } from "react-router-dom";
//import '../css/report.css'

import Layout from './Layout'
import { Button } from 'react-bootstrap';
import { collection, query, orderBy, onSnapshot, getFirestore, Firestore } from "firebase/firestore"
//import { getDatabase, ref, child, get } from "firebase/database";
import { analytics } from '../firebase'
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import '@progress/kendo-theme-default/dist/all.css';
import { Window,Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function Users() {
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
  const [usersDB, setReports] = useState([])
  
  var [rowData, setRowData] = useState([])
  var [rowData2, setRowData2] = useState([])
  var [indexID, setIndexID] = useState([])
  var [indexID2, setIndexID2] = useState([])
  useEffect(() => {
    const q = query(collection(analytics, 'usersDB'), orderBy('createdAt'))
    onSnapshot(q, (querySnapshot) => {
      setReports(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
  }, [])

  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  //const db=getDatabase()
  // Get a key for a new Post.
  //const newPostKey = firebase.database().ref().child('posts').push().key;
  // Set the "capital" field of the city 'DC'
  // db.collection("usersDB").doc("DC").update({
  //   app: true
  // });



  function updateIncStatus() {
    usersDB.forEach( (e) => { if(e.id === indexID){e.apprStatus = true; }});
    //console.log("rowid= ",rowData.id);
    console.log("indexid= ",indexID);
      if(indexID){
        var row = rowData;
        row.apprStatus = false;
        setRowData({ ...row });
      }
      setVisible(!visible);
      //setVisible2(!visible2);
  }

  function updateIncStatus2() {
    usersDB.forEach( (a) => { if(a.id === indexID){ a.apprStatus = false; }});
    console.log("rowid= ",rowData.id);
    console.log("indexid= ",indexID);
      if(indexID){
        var row = rowData;
        row.apprStatus = true;
        setRowData({ ...row });
      }
      //setVisible(!visible);
      setVisible2(!visible2);
  }

  async  function approve(id) {

    console.log(id)
    const userDoc = doc(analytics, "usersDB", id);
    const newFields = { apprStatus: "true" };
   await  updateDoc(userDoc, newFields);
    


//collection(analytics, "users").doc(id).updateDoc({apprStatus: "true"});

  // analytics.Firestore.collection("users").doc(id).update({apprStatus: "true"});

    //  setIndexID(id);
    //  setVisible2(false);
    //  setVisible(!visible);
  }

 async function revoke(id) {
    console.log(id)
    const userDoc = doc(analytics, "usersDB", id);
    const newFields = { apprStatus: "false" };
   await  updateDoc(userDoc, newFields);
    // setIndexID2(id);
    // setVisible(false);
    // setVisible2(!visible2);
  }

    return (
      <div>
        <Layout></Layout>
        <div className='outerDivTable'>

          <Grid
            style={{
              height: "525px",
            }}
            data={filterBy(usersDB, filter)}
            filterable={true}
            filter={filter}
            onFilterChange={(e) => setFilter(e.filter)}
          >
            
            {/* <GridColumn field="apprStatus" width="150px" title="Approval"/> */}

            <GridColumn field="close" width="120px" title="Approve User" filterable={false} cell={props => (
              <td>
                
                <Button variant="danger" id="approve" onClick={() => props.dataItem.apprStatus === "false" ? approve(props.dataItem.id) : revoke(props.dataItem.id)} >
                {props.dataItem.apprStatus === "false" ? "Approve" : "Revoke"}
                </Button>
              </td>
              )} 
            />

            <GridColumn field="firstName" title="First Name" />
            <GridColumn field="lastName" title="Last Name" />
            <GridColumn field="emailAddress" title="Email Address" />
            <GridColumn field="contactNumber" title="Contact Number" />
            <GridColumn field="city" title="City" />
            <GridColumn field="state" title="State" />
            <GridColumn field="role" title="Role" />
          </Grid>
          

          {/* </thead>
            <tbody id='Jdata'>
              {usersDB.map((users) => (
                <tr>
                  <td>{users.data.firstName}</td>
                  <td>{users.data.lastName}</td>
                  <td>{users.data.emailAddress}</td>
                  <td>{users.data.contactNumber}</td>
                  <td>{users.data.streetAddress}</td>
                  <td>{users.data.city}</td>
                  <td>{users.data.state}</td>
                  <td>{users.data.zipCode}</td>
                  <td>{users.data.qualification}</td>
                  <td>{users.data.role}</td>
                </tr>

              ))}


            </tbody>
          </table> */}
        </div>
        { visible && (
        <Dialog title={"Please confirm"} onClose={() => setVisible(!visible)}>
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            Are you sure you want to approve the volunteer?
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

        {/*  for revoke  */}

        { visible2 && (
        <Dialog title={"Please confirm"} onClose={() => setVisible2(!visible2)}>
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            Are you sure you want to Revoke the volunteer access?
          </p>
          <DialogActionsBar>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={() => setVisible2(!visible2)}
            >
              No
            </button>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={() => updateIncStatus2()}
            >
              Yes
            </button>
          </DialogActionsBar>
        </Dialog>
        )}
      </div>
    )
  
}

export default Users

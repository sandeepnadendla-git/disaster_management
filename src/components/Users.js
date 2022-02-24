import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
//import '../css/report.css'
import Layout from './Layout'
import { collection, query, orderBy, onSnapshot, getFirestore } from "firebase/firestore"
import { analytics } from '../firebase'
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import '@progress/kendo-theme-default/dist/all.css';


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
  useEffect(() => {
    const q = query(collection(analytics, 'usersDB'), orderBy('createdAt'))
    onSnapshot(q, (querySnapshot) => {
      setReports(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })
  }, [])

  if(document.cookie.split("; ").find(row => row.startsWith('ls=')).split("=")[1]=="1"){
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
            <GridColumn field="firstName" title="firstName" />

            <GridColumn field="lastName" title="lastName" />
            <GridColumn field="emailAddress" title="emailAddress" />
            <GridColumn field="contactNumber" title="contactNumber" />
            <GridColumn field="streetAddress" title="streetAddress" />
          </Grid>
          );

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
      </div>
    )
  }
  else{
    return (
        <Redirect to='/login' />
       );
  } 
}

export default Users

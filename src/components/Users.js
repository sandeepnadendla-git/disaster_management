import React, { useState, useEffect } from 'react'
import '../css/report.css'
import Layout from './Layout'
import { collection, query, orderBy, onSnapshot, getFirestore } from "firebase/firestore"
import { analytics } from '../firebase'



function Users() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [usersDB, setReports] = useState([])
  useEffect(() => {
    const q = query(collection(analytics, 'usersDB'), orderBy('createdAt'))
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email ID</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Qualification</th>
            <th>Role</th>
            
          </thead>
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
        </table>
      </div>
    </div>




  )
}

export default Users

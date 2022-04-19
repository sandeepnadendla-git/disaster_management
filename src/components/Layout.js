import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { analytics } from '../firebase';
import { Redirect } from "react-router-dom"
import { collection, query, orderBy, onSnapshot, getFirestore } from "@firebase/firestore";
//import useSound from 'use-sound';
import url from '../Sounds/Notification.mp3'
import "../css/Layout.css"

var temp = 0, count = 0, message = "";


const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
   
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
  };


function Layout() {
    
    const [playing, toggle] = useAudio(url);
    const [audio] = useState(new Audio(url));


    const [reportsDB, setReports] = useState([])
    useEffect(() => {
        const q = query(collection(analytics, 'reportsDB'), orderBy('timedate', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setReports(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
            if (temp == 0) {
              // alert(count+""+querySnapshot.size)
                count = querySnapshot.size;
                temp++;
            } else {

                document.getElementById("NotificationHideBtn").click();
                
                if (querySnapshot.size != count) {
                audio.play();                 
                  alert("A new incident has been reported");
                 count = querySnapshot.size;
                 
                }

            }
        })
    }, [])
    if(document.cookie.split("; ").find(row => row.startsWith('ls=')).split("=")[1]=="1"){

    return (

        <div>

            <ul className='ulLayout'>
                <NavLink exact to="/Dashboard" className="main-Nav" activeClassName="main-nav-active"><li><a>Home</a></li></NavLink>
                <NavLink exact to="/Report" className="main-Nav" activeClassName="main-nav-active"><li><a>Reports</a></li></NavLink>
                <NavLink exact to="/incidentreport" className="main-Nav" activeClassName="main-nav-active"><li><a>Report Incident</a></li></NavLink>
                <NavLink exact to="/RegisterVolunteer" className="main-Nav" activeClassName="main-nav-active"><li ><a>Register Volunteer</a></li></NavLink>
                <NavLink exact to="/users" className="main-Nav" activeClassName="main-nav-active"><li><a href="/users">Users</a></li></NavLink>
                <li style={{ float: 'right' }}><a class="active" href="/login">Log Out</a></li>
            </ul>
            <button id='NotificationHideBtn' onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
  

    )
  }
  else{

    //const navigateTo = () => history.push('/login');//eg.history.push('/login');
    return (
      <Redirect to='/login' />
     );
  }
}

export default Layout

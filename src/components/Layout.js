import React from 'react'

function Layout() {
    return (

        <div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="/Report">Reports</a></li>
                <li><a href="#contact">Report Incident</a></li>
                <li style={{ float: 'right' }}><a class="active" href="/login">Log Out</a></li>
            </ul>
        </div>

    )
}

export default Layout
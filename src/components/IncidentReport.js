import React from 'react';

import Container from 'react-bootstrap/Container';
//import { Form, Col, FormGroup, Checkbox, Button } from 'react-bootstrap'
import "../css/IncidentReport.css"


function IncidentReport() {
    return (
        <div className="outCSS"> 
        <Container>
            <label>Email:</label>
           <input className="form-control" name="Email" type="email"></input>
        </Container>
        </div>
    )
}

export default IncidentReport

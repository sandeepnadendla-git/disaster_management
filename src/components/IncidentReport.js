import React from 'react';

import Container from 'react-bootstrap/Container';

//import { Form, Col, FormGroup, Checkbox, Button } from 'react-bootstrap'
import "../css/IncidentReport.css"


function IncidentReport() {
    return (
        /*<div className="outCSS"> 
        <Container>
            <label>Email:</label>
           <input className="form-control" name="Email" type="email"></input>
        </Container>

        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>*/
        <div className="outCSS">
        <Container>
        <form>
        <div class="form-group row">

            <div class="col-sm-5">
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address" aria-describedby="emailHelp"/>
            </div>
            <div class="col-sm-5">
                <label for="city">City</label>
                <input type="text" class="form-control" id="city" aria-describedby="emailHelp"/>
            </div>
            <div class="col-sm-5">
                <label for="state">State</label>
                <input type="text" class="form-control" id="state" aria-describedby="emailHelp"/>
            </div>
            <div class="col-sm-5">
                <label for="exampleInputPassword1">Zip</label>
                <input type="text" class="form-control" id="zip" aria-describedby="emailHelp"/>
            </div>
        </div>

        <label>Coordinates</label>
        <div class="form-group row mb-3">
            <div class="col-sm-5">
                <label for="longitude">Longitude</label>
                <input type="text" class="form-control" id="longitude" aria-describedby="emailHelp"/>
            </div>
            <div class="col-sm-5">
                <label for="latitude">Latitude</label>
                <input type="text" class="form-control" id="latitude" aria-describedby="emailHelp"/>
            </div>
        </div>

        
        <div class="form-group row mb-3">
            <div class="col-sm-10">
                <label for="notes">Notes</label>
                <input type="text" class="form-control" id="notes" aria-describedby="emailHelp"/>
            </div>
        </div>

        <div class="form-group row mb-3">
            <div class="custom-file">
                
                <label class="custom-file-label" for="customFile">Choose file</label>
                <input type="file" class="custom-file-input" id="customFile"/>
            </div>
        </div>

        <div class="form-group row mb-3">
            <div class="container col-sm-2">
                <label>Casuality: </label>
            </div>
            <div class="container col-sm-2 ">
                <button type="button" class="btn btn-success">GREEN</button>
            </div>
            <div class="container col-sm-2">
                <button type="button" class="btn btn-warning">YELLOW</button>
            </div>
            <div class="container col-sm-2">
                <button type="button" class="btn btn-danger">RED</button>
            </div>
            <div class="container col-sm-2">
                <button type="button" class="btn btn-dark">BLACK</button>
            </div>
        </div>

        <div class="form-group  mb-3">
            <lable>Structural Damage: </lable>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="Structural_dm" id="sd_high" value="option1"/>
                <label class="form-check-label" for="sd_high">HIGH</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="Structural_dm" id="sd_medium" value="option2"/>
                <label class="form-check-label" for="sd_medium">MEDIUM</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="Structural_dm" id="sd_low" value="option3" />
                <label class="form-check-label" for="sd_low">LOW</label>
            </div>
        </div>

        <div class="form-group mb-3">
            <lable>Fire: </lable>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="fire_radio" id="f_high" value="option1"/>
                <label class="form-check-label" for="f_high">Major</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="fire_radio" id="f_medium" value="option2"/>
                <label class="form-check-label" for="f_medium">Moderate</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="fire_radio" id="f_medium" value="option3"/>
                <label class="form-check-label" for="f_medium">Minor</label>
            </div>
        </div>

        <div class="form-group mb-3">
            <lable>HAZMAT: </lable>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="hz_high" id="hz_high" value="option1"/>
                <label class="form-check-label" for="hz_high">Gas</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="hz_medium" id="hz_medium" value="option2"/>
                <label class="form-check-label" for="hz_medium">Fluid</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="hz_medium" id="hz_medium" value="option3"/>
                <label class="form-check-label" for="hz_medium">Solid</label>
            </div>
        </div>

        <div class="form-group row mb-3">
            <div class="col-sm-3">
                <label for="other">Other(Disaster):</label>
            </div>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="other" aria-describedby="emailHelp"/>
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </Container>
        </div>
    )
}

export default IncidentReport

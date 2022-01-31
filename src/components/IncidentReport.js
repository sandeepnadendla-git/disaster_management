import React from 'react';

import Container from 'react-bootstrap/Container';

//import { Form, Col, FormGroup, Checkbox, Button } from 'react-bootstrap'
import "../css/IncidentReport.css"


function saveIncident(e) {
    alert("Incident Reported Sucessfully");
    var incidentInfo = {
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "state": document.getElementById('state').value,
        "zip": document.getElementById('zip').value,
        "logitude": document.getElementById('logitude').value,
        "latitude": document.getElementById('latitude').value,
        "notes": document.getElementById('notes').value,
        "customFile": document.getElementById('customeFile').value,

        "cas": document.querySelector('input[name="cas"]:checked').value,
        "sdm": document.querySelector('input[name="sdm"]:checked').value,
        "fire": document.querySelector('input[name="fire"]:checked').value,
        "hz": document.querySelector('input[name="hz"]:checked').value,
        "other": document.getElementById('other').value
    }
    console.log(incidentInfo.address, incidentInfo.cas)

    window.location.reload();
}


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
            <h2 className='headingPage'> Report Incident</h2>
            <Container>
                <form onSubmit={saveIncident} autoComplete='off'>
                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <div class="col-sm-5">
                                <legend class="col-form-label col-sm-4 pt-0">Address:<span className="impFld">*</span> </legend>
                                <input class="form-control col-form col-sm-6" type="text" id="address" required />
                            </div>
                            <div class="col-sm-5">
                                <legend class="col-form-label col-sm-4 pt-0">City:<span className="impFld">*</span> </legend>
                                <input class="form-control col-form col-sm-6" type="text" id="city" required />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <div class="col-sm-5">
                                <legend class="col-form-label col-sm-4 pt-0">State: <span className="impFld">*</span></legend>
                                <input class="form-control col-form col-sm-6" type="text" id="state" required />
                            </div>
                            <div class="col-sm-5">
                                <legend class="col-form-label col-sm-4 pt-0">Zip:<span className="impFld">*</span> </legend>
                                <input class="form-control col-form col-sm-6" type="text" id="zip" required />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <div class="col-sm-5">
                                <legend class="col-form-label col-sm-4 pt-0">Longitude:<span className="impFld">*</span> </legend>
                                <input class="form-control col-form col-sm-6" type="text" id="longitude" required />
                            </div>
                            <div class="col-sm-5">
                                <legend class="col-form-label col-sm-4 pt-0">Latitude:<span className="impFld">*</span> </legend>
                                <input class="form-control col-form col-sm-6" type="text" id="latitude" required />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <legend class="col-form-label col-sm-3 pt-0">Notes:<span className="impFld">*</span></legend>
                            <div class="form-check col-sm-7">
                                <input type="text" class="form-control" id="notes" required />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <legend class="col-form-label col-sm-3 pt-0">Choose file:</legend>
                            <div class="form-check col-sm-7">
                                <input type="file" class="custom-file-input" id="customFile" multiple />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <label class="col-form-label col-sm-3 pt-0">Casuality: </label>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="cas" id="casuality1" value="green" />
                                <label class="form-check-label" for="casuality1">Green</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="cas" id="casuality1" value="yellow" />
                                <label class="form-check-label" for="casuality1">Yellow</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="cas" id="casuality1" value="red" />
                                <label class="form-check-label" for="casuality1">Red</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="cas" id="casuality1" value="black" />
                                <label class="form-check-label" for="casuality1">Black</label>
                            </div>
                        </div>
                    </fieldset>


                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <legend class="col-form-label col-sm-3 pt-0">Structural Damage: </legend>
                            <div class="form-check col-sm-2 ">
                                <input class="form-check-input" type="radio" name="sdm" id="struct_damage1" value="high" />
                                <label class="form-check-label" for="struct_damage1">HIGH</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="sdm" id="struct_damage2" value="medium" />
                                <label class="form-check-label" for="struct_damage2">MEDIUM</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="sdm" id="struct_damage3" value="low" />
                                <label class="form-check-label" for="struct_damage3">LOW</label>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <legend class="col-form-label col-sm-3 pt-0">Fire: </legend>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="fire" id="fire1" value="major" />
                                <label class="form-check-label" for="fire1">Major</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="fire" id="fire2" value="moderate" />
                                <label class="form-check-label" for="fire2">Moderate</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="fire" id="fire3" value="minor" />
                                <label class="form-check-label" for="fire3">Minor</label>
                            </div>
                        </div>
                    </fieldset>


                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <legend class="col-form-label col-sm-3 pt-0">HAZMAT: </legend>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="hz" id="hazmat1" value="gas" />
                                <label class="form-check-label" for="hazmat1">Gas</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="hz" id="hazmat2" value="fluid" />
                                <label class="form-check-label" for="hazmat2">Fluid</label>
                            </div>
                            <div class="form-check col-sm-2">
                                <input class="form-check-input" type="radio" name="hz" id="hazmat3" value="solid" />
                                <label class="form-check-label" for="hazmat3">Solid</label>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group mb-3">
                        <div class="row">
                            <legend class="col-form-label col-sm-3 pt-0">Other(Disaster):</legend>
                            <div class="form-check col-sm-7">
                                <input type="text" class="form-control" id="other" />
                            </div>
                        </div>
                    </fieldset>


                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </Container>
        </div>
    )
}

export default IncidentReport

import React from 'react';
import Container from 'react-bootstrap/Container';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';

//import { Form, Col, FormGroup, Checkbox, Button } from 'react-bootstrap'
import "../css/IncidentReport.css"
import axios from "axios"
import Layout from './Layout';
//const apiBaseUrl = "http://localhost:5051/";
const apiBaseUrl = "https://disaster-backend.herokuapp.com/";




const { useState } = React;


function saveIncident(e) {
    e.preventDefault();
  //  alert("Incident Reported Sucessfully");
    var incidentInfo = {
        "user_id": "1",
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "state": document.getElementById('state').value,
        "zip": document.getElementById('zip').value,
        "longitude": document.getElementById('longitude').value,
        "latitude": document.getElementById('latitude').value,
        "notes": document.getElementById('notes').value,
        "images": document.getElementById('output').src,
        "casuality": document.querySelector('input[name="cas"]:checked').value,
        "sDamage": document.querySelector('input[name="sdm"]:checked').value,
        "fire": document.querySelector('input[name="fire"]:checked').value,
        "hazmat": document.querySelector('input[name="hz"]:checked').value,
        "other": document.getElementById('other').value
    }
	console.log(incidentInfo);
	    axios.post(apiBaseUrl + "api/v2/saveReport", incidentInfo)
    .then(function (response) {
      if(response.status==208){
        alert("Internal server issue");
      }else{
        document.getElementById("modalBtnhide").click();
      }
});
}

function close() {
    document.getElementById("ClosePop").click();
    window.location.reload();
}

function IncidentReport() {
    
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const [state, setState] = useState(null);
console.log(state);
    return (
        <div>
            <Layout></Layout>

            {/* /*<div className="outCSS"> 
        <Container>
            <label>Email:</label>
           <input className="form-control" name="Email" type="email"></input>
        </Container>

        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>*/ }
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
                                    <legend class="col-form-label col-sm-4 pt-0">Longitude: </legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="longitude" />
                                </div>
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">Latitude: </legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="latitude" />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <legend class="col-form-label col-sm-3 pt-0">Notes: </legend>
                                <div class="form-check col-sm-7">
                                    <input type="text" class="form-control" id="notes" />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <legend class="col-form-label col-sm-3 pt-0">Choose file:</legend>
                                <div class="form-check col-sm-7">
                                    <div>
                                        <input type="file" class="custom-file-input" id="input" accept="image/*"
                                            onChange={event => setState(
                                                URL.createObjectURL(event.target.files[0])
                                            )} value="" multiple />

                                        {state && (
                                            <button
                                                onClick={event => setState(null)}
                                            >Remove Image</button>)}
                                        <img id="output" style={{ width: "50%" }} src={state} />

                                    </div>
                                   
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
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Incident</Modal.Title>
        </Modal.Header>
        <Modal.Body >Incident reported Succesfully </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" id="ClosePop" onClick={close}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleShow} id="modalBtnhide">
        Launch demo modal
      </Button>
        </div>
    )
}

export default IncidentReport


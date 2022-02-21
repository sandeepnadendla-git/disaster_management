import React from 'react';
import Container from 'react-bootstrap/Container';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { collection, addDoc, Firestore, setDoc, Timestamp } from "firebase/firestore";
import "../css/IncidentReport.css"
import axios from "axios"
import Layout from './Layout';
import { analytics } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from "firebase/storage";

//const apiBaseUrl = "http://localhost:5051/";
const apiBaseUrl = "https://disaster-backend.herokuapp.com/";




const { useState } = React;


function saveIncident(e) {
    e.preventDefault();
    //  alert("Incident Reported Sucessfully");
    const incidentInfo = {
        userName: "sandeep",
        incidentId: "123",
        title: document.getElementById('title').value,
        address: document.getElementById('address').value,
        location: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zip').value,
        longitude: document.getElementById('longitude').value,
        latitude: document.getElementById('latitude').value,
        description: document.getElementById('notes').value,
        imageURL: " ",
        green: document.getElementById('casualitygreen').value,
        yellow: document.getElementById('casualityyellow').value,
        red: document.getElementById('casualityred').value,
        black: document.getElementById('casualityblack').value,
        structuralDamageImpact: document.querySelector('input[name="sdm"]:checked').value,
        fire: document.querySelector('input[name="fire"]:checked').value,
        hazmatType: document.querySelector('input[name="hz"]:checked').value,
        notes: document.getElementById('other').value,
        timedate: Timestamp.now().toDate().toString(),
        updatedAt: Timestamp.now().toDate().toString(),
        impactLevel: document.querySelector('input[name="il"]:checked').value,
        typeOfIncident: document.getElementById('typeOfIncident').value,

        
    }


    try {
        const docRef = addDoc(collection(analytics, "reportsDB"), incidentInfo);
        alert("Report added successfully");
        window.location.reload();
    } catch (e) {
        alert("Error adding document: ", e);
    }

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
    const [image, setImage] = useState('');
    const upload = () => {
        const storage = getStorage();

        if (image == null)
            return;
        const storageRef = ref(storage, `/imageReports/${image.name}`);
        const metadata = {
            contentType: 'image/jpeg',
        };

        uploadBytesResumable(storageRef, image, metadata)
            .then((snapshot) => {
                console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                console.log('File metadata:', snapshot.metadata);
                // Let's get a download URL for the file.
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log('File available at', url);
                    // ...
                });
            }).catch((error) => {
                console.error('Upload failed', error);
                // ...
            });
    }
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
                <Container className='ContainerOuter'>
                    <form onSubmit={saveIncident} autoComplete='off'>
                    <fieldset class="form-group mb-3">
                            <div class="row">
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">Report Title:<span className="rt">*</span> </legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="title" required />
                                </div>
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">UserName:<span className="un">*</span> </legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="userName" required />
                                </div>
                            </div>
                        </fieldset>



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
                            
                                <div class="col-sm-10">
                                    <legend class="col-form-label col-sm-4 pt-0">Type of Incident:<span className="toi">*</span></legend>
                                    <input class="form-control" list="datalistOptions" id="typeOfIncident" placeholder="Type to search..."></input>
                                    <datalist id="datalistOptions">
                                    <option value="Earthquakes"></option>
                                    <option value="Floods"></option>
                                    <option value="Tornadoes"></option>
                                    <option value="Severe Storms"></option>
                                    <option value="Tropical Storms"></option>
                                    <option value="Thunderstorms"></option>
                                    <option value="Tropical cyclone"></option>
                                    <option value="Hailstorms"></option>
                                    <option value="Others"></option>
                                    </datalist>
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
                                        <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                                        <button onClick={upload}>Upload</button>
                                    </div>

                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <label class="col-form-label col-sm-3 pt-0">Casuality: </label>
                                <div class="form-check col-sm-2">
                                    <label class="form-check-label" for="casuality1">Green</label>
                                    <input class="form-control" type="number" id="casualitygreen" />
                                </div>
                                <div class="form-check col-sm-2">
                                    <label class="form-check-label" for="casuality1">Yellow</label>
                                    <input class="form-control" type="number" id="casualityyellow" />
                                </div>
                                <div class="form-check col-sm-2">
                                    <label class="form-check-label" for="casuality1">Red</label>
                                    <input class="form-control" type="number" id="casualityred" />
                                </div>
                                <div class="form-check col-sm-2">
                                    <label class="form-check-label" for="casuality1">Black</label>
                                    <input class="form-control" type="number" id="casualityblack" />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <legend class="col-form-label col-sm-3 pt-0">Impact Level: </legend>
                                <div class="form-check col-sm-2 ">
                                    <input class="form-check-input" type="radio" name="il" id="impact_level1" value="high" />
                                    <label class="form-check-label" for="struct_damage1">HIGH</label>
                                </div>
                                <div class="form-check col-sm-2">
                                    <input class="form-check-input" type="radio" name="il" id="impact_level2" value="medium" />
                                    <label class="form-check-label" for="struct_damage2">MEDIUM</label>
                                </div>
                                <div class="form-check col-sm-2">
                                    <input class="form-check-input" type="radio" name="il" id="impact_level3" value="low" />
                                    <label class="form-check-label" for="struct_damage3">LOW</label>
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


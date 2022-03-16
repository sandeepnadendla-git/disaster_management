import React from 'react';
import { Redirect } from "react-router-dom";
import "../css/RegisterVolunteer.css";
import Container from 'react-bootstrap/Container';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { collection, addDoc, Firestore, setDoc, Timestamp } from "firebase/firestore";
import axios from "axios"
import Layout from './Layout';
import { analytics } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from "firebase/storage";
//const apiBaseUrl = "http://localhost:5051/";
//const apiBaseUrl = "https://disaster-backend.herokuapp.com/";






const { useState } = React;


function saveIncident(e) {
    e.preventDefault();
    if (document.getElementById('savePass').value != document.getElementById('ChkPass').value) {
        alert("Password and repeat password doesn't match");
    } else {
        const usersInfo = {
            firstName: document.getElementById('FirstName').value,
            lastName: document.getElementById('LastName').value,
            emailAddress: document.getElementById('EmailAddress').value,
            contactNumber: document.getElementById('ContactNumber').value,
            streetAddress: document.getElementById('Address').value,
            city: document.getElementById('City').value,
            state: document.getElementById('State').value,
            zipCode: document.getElementById('Zipcode').value,
            password:document.getElementById('savePass').value,
            repeatPassword:document.getElementById('ChkPass').value,
            qualification: document.getElementById('Qualification').value,
            createdAt: Timestamp.now().toDate().toString(),
            role: 'Volunteer'
        }


        try {
            const docRef = addDoc(collection(analytics, "usersDB"), usersInfo);
            alert("Users added successfully");
            window.location.reload();
        } catch (e) {
            alert("Error adding document: ", e);
        }
    }
}

function close() {
    document.getElementById("ClosePop").click();
    window.location.reload();
}


function RegisterVolunteer() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, setState] = useState(null);


    console.log(state);

    return (
        <div>
            <Layout></Layout>
            <div className="outCSS">
                <h2 className='headingPage'> Register Volunteer</h2>
                <Container className='ContainerOuter'>
                    <form onSubmit={saveIncident} autoComplete='off'>
                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">FirstName:<span className="impFld">*</span> </legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="FirstName" required />
                                </div>
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">LastName:<span className="impFld">*</span> </legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="LastName" required />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">EmailAddress:<span className="impFld">*</span></legend>
                                    <input class="form-control col-form col-sm-6" type="email" id="EmailAddress" required />
                                </div>
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">ContactNumber:<span className="impFld">*</span> </legend>
                                    <input class="form-control col-form col-sm-6" type="number" id="ContactNumber" required />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">Address:<span className="impFld">*</span></legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="Address" required />
                                </div>
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">City:<span className="impFld">*</span> </legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="City" required />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">State:<span className="impFld">*</span></legend>
                                    <input class="form-control col-form col-sm-6" type="text" id="State" required />
                                </div>
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">Zipcode:<span className="impFld">*</span> </legend>
                                    <input class="form-control col-form col-sm-6" type="number" id="Zipcode" required />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-4 pt-0">Password:<span className="impFld">*</span></legend>
                                    <input class="form-control col-form col-sm-6" type="password" id="savePass" required />
                                </div>
                                <div class="col-sm-5">
                                    <legend class="col-form-label col-sm-6 pt-0">Repeat Password:<span className="impFld">*</span> </legend>
                                    <input class="form-control col-form col-sm-6" type="password" id="ChkPass" required />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="form-group mb-3">
                            <div class="row">

                                <div class="col-sm-10">
                                    <legend class="col-form-label col-sm-4 pt-0">Qualification:<span className="impFld">*</span></legend>
                                    <input class="form-control" list="datalistOptions" id="Qualification" placeholder="Type to search..."></input>
                                    <datalist id="datalistOptions">
                                        <option value="Medical Doctor"></option>
                                        <option value="Nurse"></option>
                                        <option value="Paramedic"></option>
                                        <option value="EMTB"></option>
                                        <option value="EMR"></option>
                                        <option value="Fire Fighter"></option>
                                        <option value="CERT Trained"></option>
                                        <option value="Law Inforcement"></option>
                                        <option value="Others"></option>
                                    </datalist>
                                </div>
                            </div>
                        </fieldset>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </Container>
            </div>
        </div>
    )
}

export default RegisterVolunteer








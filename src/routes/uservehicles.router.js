const router = require('express').Router();
import { pass } from "../helpers/auth";
import { addVehicle, deleteVehicle, editVehicle, editVehicleForm, main, myVehicles, newVehicleForm } from "../controllers/uservehicles.controller";

//DISPLAY VEHICLES
router.get("/user/myvehicles", pass, myVehicles);

//NEW VEHICLE FORM
router.get("/user/newvehicle", pass, newVehicleForm);

//ADD NEW VEHICLE
router.post('/user/newvehicle', pass, addVehicle);

//DISPLAY EDIT VEHICLE FORM
router.get('/user/myvehicles/edit/:id', pass, editVehicleForm);

// EDIT VEHICLE
router.post('/user/myvehicles/edit/:id', pass, editVehicle);

//DELETE VEHICLE
router.get('/user/myvehicles/delete/:id', pass, deleteVehicle);


export default router
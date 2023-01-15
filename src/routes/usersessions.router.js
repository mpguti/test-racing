const router = require("express").Router();
import { pass } from "../helpers/auth";
import { main } from "../controllers/uservehicles.controller";
import { addSession, deleteSession, editSession, editSessionForm, mySessions, newSessionForm } from "../controllers/usersessions.controller";



//DISPLAY SESSIONS
router.get("/user/mysessions", pass, mySessions);

//NEW SESSION FORM
router.get("/user/newsession", pass, newSessionForm);

//ADD NEW SESSION
router.post("/user/newsession", pass, addSession);

//DISPLAY EDIT SESSION
router.get('/user/mysessions/edit/:id', pass, editSessionForm);

//EDIT SESSION
router.post('/user/mysessions/edit/:id', pass, editSession);

//DELETE SESSION
router.get("/user/mysessions/delete/:id", pass, deleteSession);

export default router;

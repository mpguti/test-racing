import { logout, main } from "../controllers/user.controller";
import { pass } from "../helpers/auth";
const router = require("express").Router();


//MAIN
router.get("/user/usermain", pass, main);

//LOGOUT
router.get("/user/logout", pass, logout); 

export default router;

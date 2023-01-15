const router = require("express").Router();
import { newRegister, welcome, about, registerForm, login, passportLogin } from "../controllers/index.controller";

router.get("/", welcome);

router.get("/about", about);

router.get("/user/signup", registerForm);

router.post("/user/signup", newRegister);

router.get("/user/login", login);

router.post("/user/login", passportLogin);

export default router;

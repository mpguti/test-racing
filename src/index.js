//Express-sessions serveix per a que un usuari s'autentiqui i es guardi el login en un servidor
const express = require("express");
const app = express();
const methodOverride = require('method-override');
import session from "express-session";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";
import indexRouter from "./routes/index.router";
import userRouter from "./routes/user.router";
import userVehiclesRouter from './routes/uservehicles.router';
import userdataRouter from './routes/usersessions.router';
const flash = require('connect-flash');
const passport = require('passport');
import { PORT } from "./config";

//Init
require('./config/passport');
require("./database");

//Setting
app.set("views", path.join(__dirname + "/views"));

app.use(express.json());

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(app.get("views"), "layouts"),
    defaultLayout: "main",
    partialsDir: path.join(app.get("views"), "partials"),
  })
);

app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev")); //El que fa això és passar per consola dades sobre cada petició que reb el servidor
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use(indexRouter);
app.use(userRouter);
app.use(userdataRouter);
app.use(userVehiclesRouter);

//Static files
app.use(express.static(__dirname + "/public"));

//Server init
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

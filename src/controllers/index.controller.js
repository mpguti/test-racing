const passport = require("passport");

//Render welcome
export function welcome(req, res) {
  res.render("welcome", { layout: "main2" });
};

//Render About
export function about(req, res) {
  res.send("About");
};

//Render Login Form
export function login (req, res) {
    res.render("user/login", { layout: "main2" });
};

//Login passport
export const passportLogin = passport.authenticate("local", {
    failureMessage: true,
    failureRedirect: "/user/login",
    successRedirect: "/user/usermain",
    successMessage: true,
  });

//Render Register Form
export function registerForm(req, res) {
  res.render("user/signup", { layout: "main2" });
};

//New Register
export const newRegister = async (req, res) => {
  const { nombre, email, password, confirm_password } = req.body;
  const errors = [];
  const regexp1 = /[A-Z]+/g;
  const regexp2 = /[a-z]+/g;
  const regexp3 = /[0-9]+/g;
  const regexp4 = /[*#@!¿?¡_]+/g;

  //Nombre needed
  if (nombre.length < 1) {
    errors.push({ text: "Introduzca un nombre de usuario" });
  }

  //password
  if (password.length < 4) {
    errors.push({
      text: "La contraseña debe ser de almenos 4 caracteres de longitud",
    });
  }
  if (
    !regexp1.test(password) ||
    !regexp2.test(password) ||
    !regexp3.test(password) ||
    !regexp4.test(password)
  ) {
    errors.push({
      text: "La contraseña debe contener minúscula, mayúscula, número y signo de expresión",
    });
  }
  //password match with confirm_password
  if (password != confirm_password) {
    errors.push({ text: "La contraseña no coincide" });
  }
  if (errors.length > 0) {
    res.render("user/signup", { errors, nombre, email, password });
  } else {
    //Existing user
    const emailTrue = await User.findOne({ email: email }).lean();
    if (emailTrue) {
      errors.push({ text: "El email ya está registrado" });
      res.render("user/signup", { nombre, email, password, errors });
    }
    //New User
    else {
      const newUser = new User({ nombre, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registro exitoso");
      console.log(res.locals.success_msg);
      res.redirect("login");
    }
  }
};

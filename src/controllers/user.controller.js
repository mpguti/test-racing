import User from '../models/user.schema'

//Display main user
export async function main(req, res) {
  const user = await User.findOne({id: req.user._id}).lean();
  const name = user.nombre;
  console.log(user);
  console.log(name);
  res.render("user/usermain", {nombre: name});
};

//Logout user
export const logout = async (req, res, next) => {
  await req.logout((err) => {
    req.flash('success_msg', 'Sesión cerrada, hasta pronto!');
    res.redirect('/');
  })};


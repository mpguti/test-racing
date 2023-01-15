import User from "../models/user.schema";
import vehiculo from "../models/vehiculo.schema";



//Render my vehicles
export async function myVehicles(req, res) {
  const id = req.user._id;
  const vehiculos = await vehiculo.find({ idowner: id }).lean();
  res.render("userdata/myvehicles", {
    vehiculos: vehiculos,
  });
}

//New vehicle form
export async function newVehicleForm(req, res) {
  const id = req.user._id;
  res.render("userdata/newvehicle", { id: id });
}

//Add new vehicle
export async function addVehicle(req, res) {
  const user = req.user;
  const id = req.user._id;
  const newVehicle = new vehiculo(req.body);
  await newVehicle.save();
  const userVehicles = await User.findOne({ _id: id });
  userVehicles.vehiculos.push(newVehicle._id);
  console.log(userVehicles.vehiculos);
  await userVehicles.save();
  res.redirect("/user/myvehicles");
};

//Display edit form
export async function editVehicleForm (req, res) {
  const id = req.params.id;
  const editVehicle = await vehiculo.findOne({ _id: id}).lean();
  res.render("userdata/editvehicle", {editVehicle});
};

//Edit vehicle
export async function editVehicle (req, res) {
  const id = req.params.id;
  const editedVehicle = req.body;
  const updated = await vehiculo.findByIdAndUpdate(({ _id: id}), editedVehicle);
  res.redirect('/user/myvehicles');
};

//Delete vehicle
export async function deleteVehicle (req, res) {
  const vehicleID = req.params.id;
  console.log('id vehiculo', vehicleID);

  const user = await User.findOne({ _id: req.user._id});
 
  const vehicle = await vehiculo.findOne({ _id: vehicleID});
  const realID = vehicle._id;
  
  const index = user.vehiculos.findIndex((item) => item.equals(realID));
  user.vehiculos = user.vehiculos.splice(index-1, 1);

  user.save();
  
  await vehiculo.findByIdAndRemove({ _id: vehicleID});
  res.redirect('/user/myvehicles')
}
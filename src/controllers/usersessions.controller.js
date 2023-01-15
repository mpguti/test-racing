import User from "../models/user.schema";
import Session from "../models/session.schema";


//Display sessions
export async function mySessions(req, res) {
  const id = req.user._id;
  const populatedUser = await User.findOne({ _id: id })
    .populate(`sessiones`)
    .lean();
  const sessions = populatedUser.sessiones;
  res.render("userdata/mysessions", { sessions });
}

//New Session Form
export async function newSessionForm(req, res) {
  const id = req.user._id;
  const user = await User.findOne({ _id: id }).populate("vehiculos").lean();
  res.render("userdata/newsession", { id: id, vehicles: user.vehiculos });
}

//Add Session
export async function addSession(req, res) {
  const id = req.user._id;
  const newSession = await new Session(req.body);
  await newSession.save();
  const user = await User.findOne({ _id: id });
  user.sessiones.push(newSession._id);
  await user.save();
  req.flash('success_msg', 'Session creada con exito!')
  res.redirect("/user/mysessions");
}

//Display edit session form
export async function editSessionForm(req, res) {
  const id = req.params.id;
  const session = await Session.findOne({ _id: id }).lean();
  const user = await User.findOne({ _id: req.user._id })
    .populate("vehiculos")
    .lean();
  const vehicles = user.vehiculos;

  res.render("userdata/editsession", {
    vehicles: vehicles,
    session: session,
  });
}

//Edit Session
export async function editSession(req, res) {
  const id = req.params.id;
  const updatedData = req.body;
  const updatedSession = await Session.findByIdAndUpdate(
    { _id: id },
    updatedData
  );
  console.log("Data", updatedData);
  console.log("Session", updatedSession);
  res.redirect("/user/mysessions");
}

//Delete Session
export async function deleteSession(req, res) {
  const sessionID = req.params.id;
  const user = await User.findOne({ _id: req.user._id });

  const session = await Session.findOne({ _id: sessionID });
  const realID = session._id;

  const index = user.sessiones.findIndex((item) => item.equals(realID));

  user.sessiones = user.sessiones.splice(index - 1, 1);
  user.save();

  await Session.findOneAndDelete({ _id: sessionID });
  res.redirect("/user/mysessions");
}

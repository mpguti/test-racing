import mongoose, { Schema } from "mongoose";
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    vehiculos: [{
      type: Schema.Types.ObjectId,
      ref: 'Vehiculo'
    }],
    sessiones: [{
      type: Schema.Types.ObjectId,
      ref: 'Session'
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('user', UserSchema);


import mongoose, { Schema, model } from "mongoose";

const vehiculo = new Schema ({
    alias: {
        type: String, 
    },
    tipo:{
        type: String,
        
    },
    marca:{
        type: String
    },
    modelo:{
        type: String
    },
    motor: {
        type: String
    },
    idowner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
},   {
    timestamps: true,
    versionKey: false,
  });
  export default mongoose.model('Vehiculo', vehiculo);


//   const Vehiculo = mongoose.model('Vehiculo', vehiculo);
//   module.exports = Vehiculo;



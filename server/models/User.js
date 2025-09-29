import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {type: String},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true } // hashed
}, { timestamps: true });

const User=mongoose.model("user",UserSchema);

export default User;
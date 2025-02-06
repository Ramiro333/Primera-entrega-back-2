import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    default: 18,
  },
  role: {
    type: String,
    default: "user",
  },
  password: String,
});

export default model("User", UserSchema);

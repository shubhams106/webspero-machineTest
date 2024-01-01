import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
  },
  mobile: {
    type: Number,
  },
  zipcode: {
    type: String,
  },
  profilepic: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

export default User;

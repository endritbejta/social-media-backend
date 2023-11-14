import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      max: 30,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (validate) {
          return validate === this.password;
        },
        message: "Password confirmation does not match the password.",
      },
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    views: [{ type: String }],
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    birthday: {
      type: Date,
    },
    verified: { type: Boolean, default: 0 },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

export default User;

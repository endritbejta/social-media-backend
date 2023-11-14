import mongoose, { Schema } from "mongoose";

const AboutSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  highschool: {
    type: String,
  },
  university: {
    type: String,
  },
  residence: {
    type: String,
  },
  birthplace: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profession: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  website: {
    type: String,
  },
  socialLink: {
    type: String,
  },
});

const About = mongoose.model("About", AboutSchema);

export default About;

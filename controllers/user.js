import User from "../models/User.js";
import About from "../models/About.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const createUserAbout = async (req, res) => {
  try {
    const {
      userId,
      highschool,
      university,
      residence,
      birthplace,
      phoneNumber,
      profession,
    } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "You dont have a userId!" });
    }

    const existingAbout = await About.findOne({ userId: userId });
    if (existingAbout) {
      return res
        .status(400)
        .json({ error: "About information already exists for this user!" });
    }
    const about = new About({
      userId,
      highschool,
      university,
      residence,
      birthplace,
      phoneNumber,
      profession,
    });

    await about.save();

    return res.status(201).json(about);
  } catch (err) {
    return res.status(500).json({});
  }
};

export const getUserAbout = async (req, res) => {
  try {
    const userId = req.params.userId;

    const about = await About.findOne({ userId: userId });

    if (!about) {
      return res.status(404).json({ error: "About information not found" });
    }
    return res.status(200).json(about);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateUserAbout = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      highschool,
      university,
      residence,
      birthplace,
      phoneNumber,
      profession,
    } = req.body;

    const existingAbout = await About.findOne({ userId: userId });

    if (!existingAbout) {
      return res
        .status(404)
        .json({ error: "About information not found for this user!" });
    }

    if (highschool) existingAbout.highschool = highschool;
    if (university) existingAbout.university = university;
    if (residence) existingAbout.residence = residence;
    if (birthplace) existingAbout.birthplace = birthplace;
    if (phoneNumber) existingAbout.phoneNumber = phoneNumber;
    if (profession) existingAbout.profession = profession;

    await existingAbout.save();

    return res.status(200).json(existingAbout);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

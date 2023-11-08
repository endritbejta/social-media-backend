import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/sendEmail.js";

import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      friends,
      birthday,
    } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password confirmation does not match the password." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      confirmPassword: passwordHash,
      gender,
      friends,
      birthday,
    });
    const user = await User.findOne({ email: email });

    if (user) return res.status(400).json({ error: "User exists!" });

    const savedUser = await newUser.save();

    // EMAIL VERIFICATION
    sendVerificationEmail(savedUser, res);

    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "Invalid credentials!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials!" });

    const token = jwt.sign(
      { email: user.email, password: password },
      `${process.env.JWT_SECRET}`
    );

    delete user.password;

    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

import bcrypt from "bcrypt";

import Users from "../models/User.js";
import { compareString, createJWT } from "../utils/helpers.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      birthday,
    } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password confirmation does not match the password." });
    }

    const user = await Users.findOne({ email: email });

    if (user) return res.status(400).json({ error: "User exists!" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      confirmPassword: passwordHash,
      gender,
      birthday,
    });

    const savedUser = await newUser.save();

    // EMAIL VERIFICATION
    sendVerificationEmail(savedUser, res);

    // return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName lastName location profileUrl",
    });

    if (!user) {
      next("Invalid email or password");
      return;
    }

    if (!user.verified) {
      res.status(401).json({
        success: false,
        message:
          "User not verified. Please check your email for verification instructions.",
      });
      return;
    }

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

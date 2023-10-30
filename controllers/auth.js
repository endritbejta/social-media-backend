import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/User.js";
import { compareString, createJWT } from "../utils/helpers.js";

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
    return res.status(201).json(savedUser);
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

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Users.findOne({ email: email });
//     if (!user) return res.status(400).json({ error: "Invalid credentials!" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ error: "Invalid credentials!" });

//     const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`);

//     delete user.password;

//     return res.status(200).json({ token, user });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

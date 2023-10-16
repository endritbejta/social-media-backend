import bcrypt from "bcrypt";
import User from "../models/User.js";

/* REGISTER USER */
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
      age,
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
      birthday,
      age,
    });
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: "User exists!" });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist!" });

    console.log('Email in request:', email);
    console.log('User found in the database:', user);



    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token)

    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

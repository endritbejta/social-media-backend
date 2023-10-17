import User from "../models/User.js";

/*Created file only for creating basic users, has no authentication,
no authorization, will be deleted later on.*/
export const createUser = async (req, res) => {
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

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      birthday,
      age,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import mongoose from "mongoose";
import User from "../models/User.js";
import About from "../models/About.js";


/**
 * Created file only for creating basic users, has no authentication,
 * no authorization, will be deleted later on.
 */
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
    return res.status(500).json({ message: err.message });
  }
};
import Verification from "../models/emailVerification.js";
import { compareString, hashString } from "../utils/helpers.js";


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
    const userId = req.params.userId;
    const {
      highschool,
      university,
      residence,
      birthplace,
      phoneNumber,
      profession,
      contactEmail,
      website,
      socialLink,
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
      contactEmail,
      website,
      socialLink,
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
      contactEmail,
      website,
      socialLink,
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
    if (contactEmail) existingAbout.contactEmail = contactEmail;
    if (website) existingAbout.website = website;
    if (socialLink) existingAbout.socialLink = socialLink;

    await existingAbout.save();

    return res.status(200).json(existingAbout);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUserAbout = async (req, res) => {
  try {
    const { aboutId } = req.params;
    const about = await About.findById(aboutId);
    if (!about) {
      return res.status(404).json({ message: "User abouts not found" });
    }

    await about.deleteOne();
    return res
      .status(200)
      .json({ message: "User abouts deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const result = await Verification.findOne({ userId: userId });
    console.log("result", result, userId);
    if (result) {
      const { expiresAt, token: hashedToken } = result;

      // token has expires
      if (expiresAt < Date.now()) {
        Verification.findOneAndDelete({ userId })
          .then(() => {
            User.findOneAndDelete({ _id: userId })
              .then(() => {
                const message = "Verification token has expired.";
                res.redirect(`/users/verified?status=error&message=${message}`);
              })
              .catch((err) => {
                res.redirect(`/users/verified?status=error&message=`);
              });
          })
          .catch((error) => {
            console.log("error1", error);
            res.redirect(`/users/verified?message=`);
          });
      } else {
        //token valid
        compareString(token, hashedToken)
          .then(async (isMatch) => {
            if (isMatch) {
              await User.findOneAndUpdate({ _id: userId }, { verified: true })
                .then(async (freskim) => {
                  await Verification.findOneAndDelete({ userId }).then(
                    (shabani) => {
                      const message = "Email verified successfully";
                      console.log("shaban1", freskim);
                      res.json(
                        `/users/verified?status=success&message=${message}`,
                      );
                    },
                  );
                })
                .catch((err) => {
                  console.log(err);
                  const message = "Verification failed or link is invalid";
                  res.redirect(
                    `/users/verified?status=error&message=${message}`,
                  );
                });
            } else {
              // invalid token
              const message = "Verification failed or link is invalid";
              res.redirect(`/users/verified?status=error&message=${message}`);
            }
          })
          .catch((err) => {
            console.log(err);
            res.redirect(`/users/verified?message=`);
          });
      }
    } else {
      const message = "Verification not found.";
      res.redirect(`/users/verified?status=error&message=${message}`);
    }
  } catch (error) {
    console.log("err2", err);
    res.redirect(`/users/verified?message=`);
  }
};

// export const requestPasswordReset = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await Users.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         status: "FAILED",
//         message: "Email address not found.",
//       });
//     }

//     const existingRequest = await PasswordReset.findOne({ email });
//     if (existingRequest) {
//       if (existingRequest.expiresAt > Date.now()) {
//         return res.status(201).json({
//           status: "PENDING",
//           message: "Reset password link has already been sent tp your email.",
//         });
//       }
//       await PasswordReset.findOneAndDelete({ email });
//     }
//     await resetPasswordLink(user, res);
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { userId, token } = req.params;

//   try {
//     // find record
//     const user = await Users.findById(userId);

//     if (!user) {
//       const message = "Invalid password reset link. Try again";
//       res.redirect(`/users/resetpassword?status=error&message=${message}`);
//     }

//     const resetPassword = await PasswordReset.findOne({ userId });

//     if (!resetPassword) {
//       const message = "Invalid password reset link. Try again";
//       return res.redirect(
//         `/users/resetpassword?status=error&message=${message}`
//       );
//     }

//     const { expiresAt, token: resetToken } = resetPassword;

//     if (expiresAt < Date.now()) {
//       const message = "Reset Password link has expired. Please try again";
//       res.redirect(`/users/resetpassword?status=error&message=${message}`);
//     } else {
//       const isMatch = await compareString(token, resetToken);

//       if (!isMatch) {
//         const message = "Invalid reset password link. Please try again";
//         res.redirect(`/users/resetpassword?status=error&message=${message}`);
//       } else {
//         res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };

// export const changePassword = async (req, res, next) => {
//   try {
//     const { userId, password } = req.body;

//     const hashedpassword = await hashString(password);

//     const user = await Users.findByIdAndUpdate(
//       { _id: userId },
//       { password: hashedpassword }
//     );

//     if (user) {
//       await PasswordReset.findOneAndDelete({ userId });

//       res.status(200).json({
//         ok: true,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };

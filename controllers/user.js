import mongoose from "mongoose";

import User from "../models/User.js";
import Verification from "../models/emailVerification.js";
import { compareString, hashString } from "../utils/helpers.js";


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
      friends,
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
      friends,
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



export const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const result = await Verification.findOne({ userId });

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
            console.log(error);
            res.redirect(`/users/verified?message=`);
          });
      } else {
        //token valid
        compareString(token, hashedToken)
          .then((isMatch) => {
            if (isMatch) {
              User.findOneAndUpdate({ _id: userId }, { verified: true })
                .then(() => {
                  Verification.findOneAndDelete({ userId }).then(() => {
                    const message = "Email verified successfully";
                    res.redirect(
                      `/users/verified?status=success&message=${message}`
                    );
                  });
                })
                .catch((err) => {
                  console.log(err);
                  const message = "Verification failed or link is invalid";
                  res.redirect(
                    `/users/verified?status=error&message=${message}`
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
      const message = "Invalid verification link. Try again later.";
      res.redirect(`/users/verified?status=error&message=${message}`);
    }
  } catch (error) {
    console.log(err);
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
import mongoose, { Schema } from "mongoose";

const EmailVerificationSchema = Schema(
  {
    userId: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

const EmailVerification = mongoose.model(
  "EmailVerification",
  EmailVerificationSchema
);

export default EmailVerification;

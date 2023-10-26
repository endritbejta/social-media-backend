import crypto from "crypto";

export const generateRandomString = () => {
  return crypto.randomBytes(20).toString("hex");
};

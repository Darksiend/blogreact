import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid Email.").isEmail(),
  body("password", "Password not less than 5 characters").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];

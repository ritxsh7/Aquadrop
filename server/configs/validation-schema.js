import { body } from "express-validator";

export const registrationSchema = [
  body("name").notEmpty().isString().withMessage("Name must be a string"),
  body("phone")
    .notEmpty()
    .isNumeric()
    .withMessage("Phone number must be a number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits long"),
];

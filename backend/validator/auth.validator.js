const { z } = require("zod");
//Creating an object Schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "name must have at least 3 characters" })
    .max(255, { message: "name mmust not be more than 255 characters" }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email must have at least 3 characters" })
    .max(255, { message: "email mmust not be more than 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "passowrd must have at least 8 numbers" })
    .max(255, { message: "password must not be more than 255 numbers" }),
});

module.exports = signupSchema;

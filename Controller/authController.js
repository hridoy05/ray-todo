import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import {
  createUser,
  findUserUsingEmail,
} from "../repository/auth.repository.js";

//user sign in
const HttpRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const user = await createUser(name, email, password);

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
  });
};

//user login
const HttpLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new BadRequestError("Please provide all values");
      return next(error);
    }
    const user = await findUserUsingEmail(email);
    if (!user) {
      const error = new UnAuthenticatedError("Invalid Credentials");
      return next(error);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      const error = new UnAuthenticatedError("Invalid Credentials");
      return next(error);
    }
    const token = user.createJWT();
    user.password = undefined;
    res
      .status(StatusCodes.OK)
      .cookie("token", { token }, { httpOnly: true })
      .json({ user });
  } catch (err) {
    next(err);
  }
};

export { HttpLogin, HttpRegister };

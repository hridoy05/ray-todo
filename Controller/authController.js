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

  const token = user.createJWT();
  console.log(user, token);
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
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
    console.log(user);
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
    res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export { HttpLogin, HttpRegister };

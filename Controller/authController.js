import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import {
  createUser,
  findUserUsingEmail,
} from "../repository/auth.repository.js";
import {
  comparePassword,
  createJWT,
  encryptPassword,
} from "../utils/authUtils.js";

//user sign in
const HttpRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new BadRequestError("please provide all values");
    }
    const useremail = await findUserUsingEmail(email);
    if (useremail) {
      throw new BadRequestError("Email already in used");
    }
    const hashedPassword = await encryptPassword(password);
    const userData = { ...req.body, password: hashedPassword };
    const user = await createUser(userData);
    const token = createJWT(
      user._id,
      process.env.JWT_LIFETIME,
      process.env.JWT_SECRET
    );
    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
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
      const error = new UnAuthenticatedError("Invalid Email");
      return next(error);
    }
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      const error = new UnAuthenticatedError("Invalid password");
      return next(error);
    }
    const token = createJWT(
      user._id,
      process.env.JWT_LIFETIME,
      process.env.JWT_SECRET
    );
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export { HttpLogin, HttpRegister };

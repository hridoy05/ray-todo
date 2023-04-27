import User from "../models/User.model.js";
import BadRequestError from "../errors/bad-request.js";

async function findUserUsingEmail(email) {
  return await User.findOne({ email }).select("+password");
}

async function createUser(name, email, password) {
  console.log(name, email, password);
  const userAlreadyExists = await findUserUsingEmail(email);
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });
  return user;
}

export { createUser, findUserUsingEmail };

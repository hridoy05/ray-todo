import User from "../models/User.model.js";
import BadRequestError from "../errors/bad-request.js";

async function findUserUsingEmail(email) {
  return await User.findOne({ email }).select("+password");
}

async function createUser(name, email, password) {
  const user = await User.create({ name, email, password });
  return user;
}

export { createUser, findUserUsingEmail };

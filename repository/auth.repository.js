import User from "../models/User.model.js";

async function findUserUsingEmail(email) {
  return await User.findOne({ email }).select("+password");
}

async function createUser(userData) {
  //const user = await User.create({ name, email, password });
  const user = await new User({ ...userData });
  const savedUser = user.save();
  return savedUser;
}

export { createUser, findUserUsingEmail };

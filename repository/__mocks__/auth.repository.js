// mock repository layer

import User from "../../models/User.model";

let users = [];

export const createUser = async (userData) => {
  const user = new User({ ...userData });
  //const token = user.createJwt();
  users.push(user._doc);
  return user._doc;
};

export const findUserUsingEmail = async (email) => {
  console.log("called mock checked email");
  return users.find((user) => user.email === email) || null;
};

const HttpRegister = async (req, res) => {
  res.send("register");
};

//user login
const HttpLogin = async (req, res) => {
  res.send("login");
};

export { HttpLogin, HttpRegister };

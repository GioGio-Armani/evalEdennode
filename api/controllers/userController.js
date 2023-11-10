module.exports = {
  getLogin: (req, res) => {
    res.render("login");
  },
  getRegister: (req, res) => {
    res.render("register");
  },
  getSetting: (req, res) => {
    res.render("settings-account");
  },
};

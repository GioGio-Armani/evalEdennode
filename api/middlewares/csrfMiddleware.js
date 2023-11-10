module.exports = {
  checkCsrf: (req, res, next) => {
    console.log("session : " + req.session.csrf);
    console.log("body : " + req.body.csrftoken);
    if (req.session.csrf === req.body.csrftoken) {
      next();
    } else {
      console.log("csrf error");
      res.redirect("/");
    }
  },
};

const express = require("express");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
const crypto = require("crypto");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const session = require("express-session");
const helmet = require("helmet");

const router = require("./api/router");

MomentHandler.registerHelpers(Handlebars);

const app = express();
const port = process.env.PORT;

app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");

generateCsrfToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

Handlebars.registerHelper("isSelected", function (value, condition) {
  return value === condition ? "selected" : "";
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["self", "cdn.jsdelivr.net"],
      },
    },
  })
);

app.use((req, res, next) => {
  res.locals.csrf =
    req.session.csrf || (req.session.csrf = generateCsrfToken());
  console.log(req.session);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

app.use("/", router);

app.listen(port, () => {
  console.log("le serveur tourne sur http://localhost:" + port);
});

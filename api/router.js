const express = require("express");
const homeController = require("./controllers/homeController");
const articleController = require("./controllers/articleController");
const userController = require("./controllers/userController");
const { articleMiddleware } = require("./middlewares/formMiddlewares");
const { checkCsrf } = require("./middlewares/csrfMiddleware");
const router = express.Router();

//home
router.route("/").get(homeController.get);

// articles

router.route("/articles").get(articleController.getArticles);
router.route("/list-article").get(articleController.getListArticles);
router.route("/form-article").get(articleController.getFormArticle);

router
  .route("/form-article")
  .post(articleMiddleware, checkCsrf, articleController.postArticle);
router.route("/form-article/:_id").get(articleController.getUpdateArticle);
router
  .route("/form-article/:_id")
  .post(articleMiddleware, checkCsrf, articleController.updateArticle);

router.route("/delete/:_id").post(checkCsrf, articleController.delete);

// users
router.route("/login").get(userController.getLogin);
router.route("/register").get(userController.getRegister);
router.route("/settings").get(userController.getSetting);

module.exports = router;

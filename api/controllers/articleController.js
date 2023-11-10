const articleModel = require("../models/articleModel");

module.exports = {
  getArticles: async (req, res) => {
    const articles = await articleModel.find().lean();
    res.render("articles", { articles });
  },
  getListArticles: (req, res) => {
    res.render("my-list-article");
  },
  getFormArticle: (req, res) => {
    res.render("form-article");
  },
  postArticle: async (req, res) => {
    await articleModel.create({
      title: req.body.title,
      description: req.body.description,
      poids: req.body.poids,
      quantite: req.body.quantite,
      prix: req.body.prix,
      unit: req.body.unit,
      category: req.body.category,
      isBest: req.body.isBest,
    });
    res.redirect("/articles");
  },

  getUpdateArticle: async (req, res) => {
    const article = await articleModel.findById(req.params._id).lean();
    res.render("form-article", { article });
  },
  updateArticle: async (req, res) => {
    await articleModel.findByIdAndUpdate(req.params._id, {
      title: req.body.title,
      description: req.body.description,
      poids: req.body.poids,
      quantite: req.body.quantite,
      prix: req.body.prix,
      unit: req.body.unit,
      category: req.body.category,
      isBest: req.body.isBest,
    });
    res.redirect("/articles");
  },

  delete: async (req, res) => {
    try {
      await articleModel.findByIdAndDelete(req.params._id);
      res.redirect("/articles");
    } catch (err) {
      console.log(err);
    }
  },
};

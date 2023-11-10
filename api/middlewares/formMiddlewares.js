const { check, validationResult } = require("express-validator");

module.exports = {
  articleMiddleware: [
    check("title").notEmpty().withMessage("Le titre est obligatoire"),
    check("description")
      .notEmpty()
      .withMessage("La description est obligatoire"),
    check("prix")
      .isNumeric()
      .withMessage("Le prix est obligatoire et doit etre un nombre"),
    check("prix")
      .custom((value) => {
        return /^\d+(\.\d{0,2})?$/.test(value);
      })
      .withMessage("Le prix doit avoir jusqu'à deux chiffres après la virgule"),
    check("poids")
      .custom((value) => {
        return /^\d+(\.\d{0,2})?$/.test(value);
      })
      .withMessage(
        "Le poids doit avoir jusqu'à deux chiffres après la virgule"
      ),
    check("quantite")
      .custom((value) => {
        return /^\d+(\.\d{0,2})?$/.test(value);
      })
      .withMessage(
        "La quantité doit avoir jusqu'à deux chiffres après la virgule"
      ),
    check("poids")
      .isNumeric()
      .withMessage("Le poids est obligatoire et doit etre un nombre"),
    check("quantite")
      .isNumeric()
      .withMessage("La quantité est obligatoire et doit etre un nombre"),
    check("isBest").isBoolean().withMessage("Le champ isBest est obligatoire"),
    check("unit")
      .isIn(["litre", "unite", "kilo"])
      .withMessage("L'unité de mesure est obligatoire"),
    check("category")
      .isIn(["dessert", "plat", "epicerie-sale", "epicerie-sucre"])
      .withMessage("La catégorie est obligatoire"),

    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("form-article", {
          errors: errors.array(),
          article: req.body,
        });
      }
      next();
    },
  ],
};

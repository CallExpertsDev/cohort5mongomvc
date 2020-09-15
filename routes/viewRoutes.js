const { getHomePage, getAboutPage } = require("../controllers/viewControllers");

const viewRoutes = app => {
  app.get("/", getHomePage);
  app.get("/about", getAboutPage);
};

module.exports = { viewRoutes };

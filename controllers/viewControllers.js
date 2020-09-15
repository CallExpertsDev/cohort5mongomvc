const path = require("path");

const getHomePage = async (request, response) => {
  try {
    console.log("SEND HOME PAGE");
    response.sendFile(path.join(__dirname + "/../views/index.html"));
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

const getAboutPage = async (request, response) => {
  try {
    console.log("SEND ABOUT PAGE");
    response.sendFile(path.join(__dirname + "/../views/about.html"));
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

module.exports = { getHomePage, getAboutPage };

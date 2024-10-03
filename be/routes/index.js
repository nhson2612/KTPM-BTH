const fs = require("fs");

const routes = [];

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    routes.push(require(`./${file}`));
  });

module.exports = routes;

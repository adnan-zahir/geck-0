const chalk = require("chalk");

module.exports = {
  name: "err",
  execute() {
    console.log(chalk.red("Something wrong with database connection"));
  },
};

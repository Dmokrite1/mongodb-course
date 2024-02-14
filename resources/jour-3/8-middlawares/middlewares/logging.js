const fs = require("fs/promises");

module.exports = async function (savedObject) {
  await fs.appendFile(
    "logs.txt",
    `${savedObject.title} a été inséré à ${new Date().toLocaleDateString()}\n`
  );
};

/**
 * Rajoute automatiquement une date de création à l'objet
 */
module.exports = function (next) {
  this.creationDate = new Date();
  next();
};

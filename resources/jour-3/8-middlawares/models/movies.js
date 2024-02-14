const mongoose = require("mongoose");
const loggingMiddleware = require("../middlewares/logging");
const creationDateMiddleware = require("../middlewares/creation-date");

const movieSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["add"],
  },
  directors: {
    type: [String], // [String] correspond à un tableau de String
  },
  release_date: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
  },
  genres: {
    type: [String],
  },
  image_url: String,
  plot: String,
  title: {
    type: String,
    unique: true,
  },
  rank: {
    type: Number,
    min: 0,
  },
  running_time_in_secs: {
    type: Number,
    min: 0,
    max: 60000,
  },
  actors: {
    type: [String],
  },
  year: {
    type: Number,
    min: 1900,
    max: 2021,
  },
  creationDate: Date,
});

// fare un middleware qui va ajouter une date de création avant l'insertion de votre objet en DB
movieSchema.pre("save", creationDateMiddleware);

// faire un middleware qui va écrire dans un fichier à chaque fois qu'un film est inséré (logger => "Le film "taatata" a été inséré à 19H04")
movieSchema.post("save", loggingMiddleware);

const moviesModel = mongoose.model("movies", movieSchema);

module.exports = moviesModel;

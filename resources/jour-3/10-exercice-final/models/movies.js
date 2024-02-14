const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
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
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// création d'une relation virtuelle
movieSchema.virtual("comments", {
  ref: "comments", // le modèle étranger
  localField: "_id", // le champ local
  foreignField: "movie_id", // le champ dans l'autre modèle
});

const moviesModel = mongoose.model("movies", movieSchema);

module.exports = moviesModel;

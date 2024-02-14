const mongoose = require("mongoose");
const moviesModel = require("./models/movies");
const commentModel = require("./models/comments");

async function init() {
  try {
    const connect = mongoose.connect("mongodb://localhost:27017/movies", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const oneCommentWithMovie = await commentModel
      .findOne()
      .populate("movie_id");

    console.log(oneCommentWithMovie);

    console.log("Vous êtes connecté à la base de données");

    const oneMovieWithComment = await moviesModel
      .find()
      .populate("comments")
      .limit(10);

    console.log(oneMovieWithComment);
  } catch (e) {
    console.log(e);
  }
}

init();

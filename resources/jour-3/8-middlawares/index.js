const mongoose = require("mongoose");
const moviesModel = require("./models/movies");

async function init() {
  try {
    const connect = mongoose.connect("mongodb://localhost:27017/technocite", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const newMovie = new moviesModel({
      title: "Sébastien est une star mondiale",
      description: "description",
    });

    await newMovie.save();
  } catch (e) {
    console.log(e);
  }
}

init();

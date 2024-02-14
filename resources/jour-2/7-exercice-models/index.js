const mongoose = require("mongoose");
const moviesModel = require("./models/movies");

async function init() {
  try {
    const connect = mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const newMovie = new moviesModel({
      type: "add",
      title: "Film test",
      description: "ezkfjzeljlek jlezfjlezjzekl jzel:;f jzel;:f jezl,",
    });

    console.log(newMovie.validateSync());
  } catch (e) {
    console.log(e);
  }
}

init();

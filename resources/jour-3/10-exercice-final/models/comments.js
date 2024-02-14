const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  name: String,
  email: String,
  text: String,
  date: Date,
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
  },
});

const commentsModel = mongoose.model("comments", commentsSchema);

module.exports = commentsModel;

import mongoose from "mongoose";
import "./article";
import { ArticleModel, IArticle } from "./article";

async function init() {
  // mongo connection string
  try {
    const conn = await mongoose.connect(
      "mongodb://root:test123@localhost:27017/blog?authSource=admin"
    );
    console.log("Connected to", conn.connection.db.databaseName);
  } catch (e) {
    console.error("Failed to connect to server",e);
  }

  let newArticle = new ArticleModel({
    comments: [
      {
        content: "C'est null",
      },
    ],
    title: "Le réseau pour les nulls 3",
    body: "Irure exercitation deserunt dolor nostrud quis sit Lorem ullamco culpa.",
    author: "Mister Mandoux",
  });

  try {
    await newArticle.save();
  } catch (e) {
    console.error("Une erreur est survenue lors de la sauvegarde de l'article", (e as Error).message);
  }

  const articles = await Promise.all([
    // return object
    ArticleModel.findById(newArticle._id, ["title"]),
    // return array
    ArticleModel.find({ _id : newArticle._id }, ["title"]),
    // return object
    ArticleModel.findOne({ _id : newArticle._id }, ["title"])
  ]);
  
  console.log(articles);
}

init();

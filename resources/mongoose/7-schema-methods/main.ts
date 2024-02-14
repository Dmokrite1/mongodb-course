import mongoose from "mongoose";
import "./article";
import { ArticleModel } from "./article";

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

  console.log(newArticle.slugify());
  console.log(newArticle.readable);
  console.log(await ArticleModel.findWithOnlyAuthors());
}

init();

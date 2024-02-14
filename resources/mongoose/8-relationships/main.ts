import mongoose from "mongoose";
import { ArticleModel } from "./article";
import "./comment";

async function init() {
  	// mongo connection string
    mongoose.set("debug",true);
    try {
	    const conn = await mongoose.connect('mongodb://root:test123@localhost:27017/blog?authSource=admin');
        console.log("Connected to", conn.connection.db.databaseName);
    }catch(e) {
        console.error("Failed to connect to server");
    }

    // let article = new ArticleModel({
    //     title: "Le réseau pour les nulls 3",
    //     body: "Irure exercitation deserunt dolor nostrud quis sit Lorem ullamco culpa.",
    //     author: "Mister Mandoux",
    //   });
    
    //   try {
    //     await article.save();
    //   } catch (e) {
    //     console.error("Une erreur est survenue lors de la sauvegarde de l'article", (e as Error).message);
    //   }

    //   let newComment = new CommentModel({
    //     content: "Bonjour",
    //     article
    //   });
    //   await newComment.save();

    const articlesWithComments = await ArticleModel.find().populate("comments");
    console.log(articlesWithComments);
}

init();
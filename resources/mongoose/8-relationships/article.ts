import { HydratedDocument, Model, model, Schema } from "mongoose";
import { IComment } from "./comment";

interface IArticle {
  title: string;
  author: string;
  body: string;
  date: Date;
}

interface IArticleMethods {
  comments: HydratedDocument<IComment>[];
}

interface ArticleModel extends Model<IArticle, {}, IArticleMethods> {}

const articleSchema = new Schema<IArticle, ArticleModel, IArticleMethods>(
  {
    title: {
      unique: true,
      type: String,
      required: true,
    },
    author: {
      type: String,
      // required field
      required: true,
    },
    body: {
      // default value
      default: "Lorem ipsum dolor sit amet",
      type: String,
    },
    date: {
      // over january 2001
      min: new Date(2000, 1),
      default: () => new Date(),
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

// virtual relationship
articleSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "article",
});

export const ArticleModel = model<IArticle, ArticleModel>(
  "article",
  articleSchema
);

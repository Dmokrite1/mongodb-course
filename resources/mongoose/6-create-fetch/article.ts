import { Model, model, Schema, Types } from "mongoose";

export interface IArticle {
  title: string;
  author: string;
  body: string;
  date: Date;
  comments: Types.DocumentArray<IComment>;
}

type ArticleModelType = Model<IArticle, {}, {}>;

interface IComment {
  content: string;
}

export const CommentSchema = new Schema<IComment>({
  content: String,
});

export const ArticleSchema = new Schema<IArticle>({
  title: {
    unique: true,
    type: String,
    required: function (this: IArticle) {
      // anti N-word
      return !this.title.includes("nigga");
    },
  },
  author: {
    type: String,
    // required field
    required: true,
  },
  body: {
    // default value
    default: "Lorem ipsum dolor sit amet",
    max: 50000,
    type: String,
  },
  date: {
    // over january 2001
    min: new Date(2000, 1),
    default: () => new Date(),
    type: Date,
  },
  comments: [CommentSchema],
});

export const ArticleModel = model<IArticle,ArticleModelType>("article", ArticleSchema);
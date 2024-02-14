import { model, Schema } from "mongoose";

interface IArticle {
  title:  string, 
  author: string,
  body:   string,
  date: Date,
}

export const ArticleSchema = new Schema<IArticle>({
  title: {
    unique: true,
    type: String,
    required: function(this: IArticle) {
      // anti N-word
      return !this.title.includes("nigga");
    }
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
    type: String
  },
  date: {
    // over january 2001
    min: new Date(2000,1),
    default: () => new Date(),
    type: Date
  }
});
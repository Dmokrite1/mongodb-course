import { HydratedDocument, Model, model, Schema, Types } from "mongoose";

interface IArticle {
  title: string;
  author: string;
  body: string;
  date: Date;
  comments: Types.DocumentArray<{
    content: string;
  }>;
}

interface IArticleMethods {
  slugify(): string;
  readable: string;
}

interface ArticleModel extends Model<IArticle, {}, IArticleMethods> {
  findWithOnlyAuthors(): Promise<HydratedDocument<IArticle, IArticleMethods>>;
}

export const articleSchema = new Schema<
  IArticle,
  ArticleModel,
  IArticleMethods
>({
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
  comments: [
    {
      content: String,
    },
  ],
});

articleSchema.methods.slugify = function (
  this: HydratedDocument<IArticle, IArticleMethods>
) {
  return this.title.replace(" ", "-");
};

articleSchema.statics.findWithOnlyAuthors = function () {
  return this.find({
    author: {
      $exists: true,
    },
  });
};

articleSchema
  .virtual("readable")
  .get(function (this: HydratedDocument<IArticle, IArticleMethods>) {
    return `${this.title} - ${this.author}`;
  });

export const ArticleModel = model<IArticle>(
  "article",
  articleSchema
);

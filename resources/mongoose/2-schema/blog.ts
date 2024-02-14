import { model, Schema } from "mongoose";

// create interface for typescript autocompletion
interface IBlog {
  title:  string, 
  author: string,
  body:   string,
  comments: { body: string, date: string }[],
  date: Date
}

// create the schema
export const blogSchema = new Schema<IBlog>({
  title:  String, 
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date }
});

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  topic: String,
  title: String,
  id: String,
  pic: String,
  tag: String,
  content: String,
  bookmark: Boolean
});

const Article = mongoose.model('Article', ArticleSchema);
export default Article;
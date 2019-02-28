import mongoose from 'mongoose';
var Schema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  title: String,
  bodyText: String
});
export default mongoose.model('Article', Schema);
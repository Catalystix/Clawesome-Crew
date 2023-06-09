const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const articleSchema = new Schema({
  description: {
    type: String,

    trim: true,
  },
  title: {
    type: String
  },
  
  image: {
    type: String
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  url: {
    type: String
  },
  articleAuthor: {
    type: String,
    required: true,
    trim: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Article = model('Article', articleSchema);

module.exports = Article;

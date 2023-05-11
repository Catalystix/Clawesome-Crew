const { AuthenticationError } = require('apollo-server-express');
const { User, Article, DailyImage } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('articles');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('articles');
    },
    articles: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Article.find(params).sort({ createdAt: -1 });
    },
    article: async (parent, { articleId }) => {
      return Article.findOne({ _id: articleId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('articles'),
        User.find({_id: context.user._id}).populate('images');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addArticle: async (parent, { description }, context) => {
      if (context.user) {
        const article = await Article.create({
          description,
          articleAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { articles: article._id } }
        );

        return article;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addImage: async (parent,  args, context) => {
      if (context.user) {
        const image = await DailyImage.create({
          ...args,
          user_id: context.user._id
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { images: image._id } }
        );

        return image;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeImage: async (parent, { imageId }, context) => {
      if (context.user) {
        const image = await DailyImage.findOneAndDelete({
          _id: imageId,
          user_id: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { images: image._id } }
        );

        return image;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { articleId, commentText }, context) => {
      if (context.user) {
        return Article.findOneAndUpdate(
          { _id: articleId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeArticle: async (parent, { articleId }, context) => {
      if (context.user) {
        const article = await Article.findOneAndDelete({
          _id: articleId,
          articleAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { articles: article._id } }
        );

        return article;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { articleId, commentId }, context) => {
      if (context.user) {
        return Article.findOneAndUpdate(
          { _id: articleId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Articles from './Articles';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'articles.findOne': function articlesFindOne(articleId) {
    check(articleId, Match.OneOf(String, undefined));

    try {
      return Articles.findOne(articleId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'articles.insert': function articlesInsert(artic) {
    check(artic, {
      title: String,
      htmlBody: String,
    });

    try {
      return Articles.insert({ author: this.userId, ...artic });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'articles.update': function articlesUpdate(artic) {
    check(artic, {
      _id: String,
      title: String,
      htmlBody: String,
    });

    try {
      const articleId = artic._id;
      const articToUpdate = Articles.findOne(articleId, { fields: { author: 1 } });

      if (articToUpdate.author === this.userId) {
        Articles.update(articleId, { $set: artic });
        return articleId; // Return _id so we can redirect to article after update.
      }

      throw new Meteor.Error('403', 'Sorry. You\'re not allowed to edit this article.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'articles.remove': function articlesRemove(articleId) {
    check(articleId, String);

    try {
      const articToRemove = Article.findOne(articleId, { fields: { author: 1 } });

      if (articToRemove.author === this.userId) {
        return Articles.remove(articleId);
      }

      throw new Meteor.Error('403', 'Sorry. You\'re not allowed to delete this article.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'articles.insert',
    'articles.update',
    'articles.remove',
  ],
  limit: 5,
  timeRange: 1000,
});

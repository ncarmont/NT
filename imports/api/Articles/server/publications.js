import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Articles from '../Articles';

Meteor.publish('articles', function articles() {
  return Articles.find({});
});

// Note: articles.view is also used when editing an existing article.
Meteor.publish('articles.view', (articleId) => {
  check(articleId, String);
  return Articles.find({ _id: articleId });
});

Meteor.publish('articles.edit', function articlesEdit(articleId) {
  check(articleId, String);
  return Articles.find({ _id: articleId, owner: this.userId });
});

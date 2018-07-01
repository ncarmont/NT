import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Articles = new Mongo.Collection('Articles');

Articles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Articles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

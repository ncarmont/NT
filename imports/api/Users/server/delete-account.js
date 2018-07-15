/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import Articles from '../../Articles/Articles';

let action;

const deleteUser = (userId) => {
  try {
    return Meteor.users.remove(userId);
  } catch (exception) {
    throw new Error(`[deleteAccount.deleteUser] ${exception.message}`);
  }
};

const deleteDArticles = (userId) => {
  try {
    return Articles.remove({ author: userId });
  } catch (exception) {
    throw new Error(`[deleteAccount.deleteArticles] ${exception.message}`);
  }
};

const deleteAccount = ({ userId }, promise) => {
  try {
    action = promise;
    deleteArticles(userId);
    deleteUser(userId);
    action.resolve();
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options =>
  new Promise((resolve, reject) =>
    deleteAccount(options, { resolve, reject }));

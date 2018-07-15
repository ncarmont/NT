/* eslint-disable consistent-return */

import JSZip from 'jszip';
import Articles from '../../Articles/Articles';

let action;

const generateZip = (zip) => {
  try {
    zip.generateAsync({ type: 'base64' })
      .then(content => action.resolve(content));
  } catch (exception) {
    throw new Error(`[exportData.generateZip] ${exception.message}`);
  }
};

const addArticlesToZip = (articles, zip) => {
  try {
    articles.forEach((article) => {
      zip.file(`${article.title}.txt`, `${article.title}\n\n${article.htmlBody}`);
    });
  } catch (exception) {
    throw new Error(`[exportData.addArticlesToZip] ${exception.message}`);
  }
};

const getArticles = (userId) => {
  try {
    return Articles.find({ author: userId }).fetch();
  } catch (exception) {
    throw new Error(`[exportData.getArticles] ${exception.message}`);
  }
};

const exportData = ({ userId }, promise) => {
  try {
    action = promise;
    const zip = new JSZip();
    const articles = getArticles(userId);
    addArticlesToZip(articles, zip);
    generateZip(zip);
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options =>
  new Promise((resolve, reject) =>
    exportData(options, { resolve, reject }));

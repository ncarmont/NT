import createIndex from '../../../modules/server/create-index';
import Articles from '../Articles';

createIndex(Articles, { author: 1 });

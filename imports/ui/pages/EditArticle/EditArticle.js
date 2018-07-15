import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Articles from '../../../api/Articles/Articles';
import ArticleEditor from '../../components/ArticleEditor/ArticleEditor';
import NotFound from '../NotFound/NotFound';

const EditArticle = ({ artic, history }) => (artic ? (
  <div className="EditArticle">
    <h4 className="page-header">{`Editing "${artic.title}"`}</h4>
    <ArticleEditor artic={artic} history={history} />
  </div>
) : <NotFound />);

EditArticle.defaultProps = {
  artic: null,
};

EditArticle.propTypes = {
  artic: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const articleId = match.params._id;
  const subscription = Meteor.subscribe('articles.edit', articleId);

  return {
    loading: !subscription.ready(),
    artic: Articles.findOne(articleId),
  };
})(EditArticle);

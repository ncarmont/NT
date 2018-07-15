import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Articles from '../../../api/Articles/Articles';
import SEO from '../../components/SEO/SEO';
import NotFound from '../NotFound/NotFound';

const handleRemove = (articleId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('articles.remove',articleId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Article deleted!', 'success');
        history.push('/articles');
      }
    });
  }
};

const renderArticle = (artic, match, history) => (artic ? (
  <div className="ViewArticle">
    <SEO
      title={artic.title}
      description={artic.htmlBody}
      url={`articles/${artic._id}`}
      contentType="article"
      published={artic.createdAt}
      updated={artic.updatedAt}
      twitter="NovaTerra"
    />
    <div className="page-header clearfix">
      <h4 className="pull-left">{ artic && artic.title }</h4>
      {Meteor.isClient && Meteor.userId() ? (
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(artic._id, history)} className="text-danger">
              Delete
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      ) : ''}
    </div>
    { artic && artic.htmlBody }
  </div>
) : <NotFound />);

const ViewArticle = ({ artic, match, history }) => (renderArticle(artic, match, history));

ViewArticle.defaultProps = {
  artic: null,
};

ViewArticle.propTypes = {
  artic: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({ ...state })),
  withTracker(({ match }) => {
    const articleId = match.params._id;
    if (Meteor.isClient) Meteor.subscribe('article.view', articleId);

    return {
      artic: Articles.findOne(articleId),
    };
  }),
)(ViewArticle);

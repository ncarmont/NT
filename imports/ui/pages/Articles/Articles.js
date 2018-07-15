import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ArticlesCollection from '../../../api/Articles/Articles';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';

const StyledArticles = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const handleRemove = (articleId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('articles.remove', articleId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Article deleted!', 'success');
      }
    });
  }
};

const Articles = ({
  loading, articles, match, history,
}) => (!loading ? (
  <StyledArticles>
    <div className="page-header clearfix">
      <h4 className="pull-left">Articles</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Article</Link>
    </div>
    {articles.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {articles.map(({
            _id, title, createdAt, updatedAt,
          }) => (
            <tr key={_id}>
              <td>{title}</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="You're plum out of Articles, friend!"
        subtitle="Add your first Article by clicking the button below."
        action={{
          style: 'success',
          onClick: () => history.push(`${match.url}/new`),
          label: 'Create Your First Article',
        }}
      />}
  </StyledArticles>
) : <Loading />);

Articles.propTypes = {
  loading: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('articles');
  return {
    loading: !subscription.ready(),
    articles: ArticlesCollection.find().fetch(),
  };
})(Articles);

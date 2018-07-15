/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class ArticleEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        htmlBody: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        htmlBody: {
          required: 'This thneeds a html body, please.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    const existingArticle = this.props.artic && this.props.artic._id;
    const methodToCall = existingArticle ? 'articles.update' : 'articles.insert';
    const artic = {
      title: form.title.value.trim(),
      htmlBody: form.htmlBody.value.trim(),
    };

    if (existingArticle) artic._id = existingArticle;

    Meteor.call(methodToCall, artic, (error, articleId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingArticle ? 'Article updated!' : 'Article added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/articles/${articleId}`);
      }
    });
  }

  render() {
    const { artic } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="title"
            defaultValue={artic && artic.title}
            placeholder="Oh, The Places You'll Go!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>htmlBody</ControlLabel>
          <textarea
            className="form-control"
            name="body"
            defaultValue={artic && artic.htmlBody}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {artic && artic._id ? 'Save Changes' : 'Add Article'}
        </Button>
      </form>
    );
  }
}

ArticleEditor.defaultProps = {
  artic: { title: '', htmlBody: '' },
};

ArticleEditor.propTypes = {
  artic: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default ArticleEditor;

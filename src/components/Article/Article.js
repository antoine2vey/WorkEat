import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getArticleById, fetchArticlesIfNeeded } from '../../actions/articles';

class Article extends Component {
  componentDidMount() {
    const { articleId } = this.props.match.params;
    this.props.getArticleById(articleId);
  }

  render() {
    const { article } = this.props;
    return (
      <div>
        <Helmet>
          <title>WorkEat - Article de blog</title>
          <meta name="description" content="Article lol ptdr xd viagra porno" />
        </Helmet>
        <div className="article">
          <div className="article__header" style={{ backgroundImage: `url(${article.banner})` }}>
            <h1 className="article__title">{article.title}</h1>
            <div className="article__opacity" />
          </div>
          <div className="article__container" dangerouslySetInnerHTML={{ __html: article.text }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.articles.currentArticle,
});

export default connect(mapStateToProps, { getArticleById, fetchArticlesIfNeeded })(Article);

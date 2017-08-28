import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchArticlesIfNeeded } from '../../actions/articles';

class Blog extends Component {
  componentDidMount() {
    this.props.fetchArticlesIfNeeded();
  }

  render() {
    const { articles } = this.props;
    return (
      <div>
        <Helmet>
          <title>Workeat - Actualités</title>
          <meta name="description" content="Retrouvez toute l'actualité de Workeat" />
        </Helmet>
        <div className="blog">
          <div className="blog__header">
            <h1 className="blog__title">Actualités</h1>
          </div>
          <div className="blog__container">
            <div className="blog__column">
              { articles.map(({ _id, title, thumbnail, slug }) => (
                <div className="blog__article" key={_id}>
                  <h2 className="blog__article-title">{title}</h2>
                  <NavLink to={`/article/${slug}`} className="blog__article-link">Lire</NavLink>
                  <img className="blog__article-thumb" src={thumbnail} alt="Nom de l'article" />
                </div>
              )) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles.articles,
  isFetching: state.articles.isFetching,
});

export default connect(mapStateToProps, { fetchArticlesIfNeeded })(Blog);

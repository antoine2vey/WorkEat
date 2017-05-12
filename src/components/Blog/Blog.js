import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { articleThumb } from '../../images';

class Blog extends Component {
  render() {
    return (
      <div>
        <div className="blog">
          <div className="blog__header">
            <h1 className="blog__title">Actualités</h1>
          </div>
          <div className="blog__container">
            <div className="blog__column">
              <div className="blog__article">
                <h2 className="blog__article-title">Pourquoi réduire ses apports en viande ?</h2>
                <NavLink to="/article/test" className="blog__article-link">Lire</NavLink>
                <img className="blog__article-thumb" src={articleThumb} alt="Nom de l'article" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;

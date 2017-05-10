import React, { Component } from 'react';

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
                <h2 className="blog__article-title">Titre de l'article</h2>
                <a className="blog__article-link" href="#">Lire</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;

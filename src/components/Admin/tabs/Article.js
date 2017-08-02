import React, { Component } from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { createArticles, deleteArticles, fetchArticlesIfNeeded } from '../../../actions/articles';
import { Input } from './FormFields';

class Article extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      text: RichTextEditor.createEmptyValue(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchArticlesIfNeeded();
  }

  focusInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.add('is-focused');
  }

  blurInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.remove('is-focused');
  }

  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'banner':
      case 'thumbnail': {
        const reader = new FileReader();
        const img = document.getElementById('preview');
        reader.readAsDataURL(event.target.files[0]);

        reader.addEventListener('load', () => {
          img.src = reader.result;
          this.setState({ [name]: reader.result });
        });
        break;
      }
      default: {
        this.setState({ [name]: value });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Convert RTE text to html, sanitize server side
    this.props.createArticles({
      ...this.state,
      text: this.state.text.toString('html'),
    });
  }

  onChange = (value) => {
    this.setState({ text: value });
  };

  render() {
    const { articles } = this.props;
    return (
      <div className="admin__products">
        <h2 className="admin__products-title">Mes articles</h2>
        <ul>
          { articles.map(article => (
            <li key={article._id}>{article.title} - <button onClick={() => this.props.deleteArticles(article._id)}>X</button></li>
          )) }
        </ul>
        <div className="admin__add-product">
          <h2 className="admin__products-title">Ajouter un article</h2>
          <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="file" className="label">Bannière</label>
              <p className="control">
                <input className="input" type="file" name="banner" onChange={this.handleChange} />
              </p>
            </div>
            <div className="field">
              <label htmlFor="file" className="label">Thumbnail</label>
              <p className="control">
                <input className="input" type="file" name="thumbnail" onChange={this.handleChange} />
              </p>
              <img src="" id="preview" style={{ maxWidth: 400 }} alt="Preview" />
            </div>
            <Input type="text" name="title" placeholder="Titre" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            <RichTextEditor
              value={this.state.text}
              onChange={this.onChange}
            />
            <Input type="submit" value="Créer" onFocus={this.focusInput} onBlur={this.blurInput} className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles.articles,
  isFetching: state.articles.isFetching,
});

export default connect(mapStateToProps, {
  fetchArticlesIfNeeded,
  deleteArticles,
  createArticles,
})(Article);

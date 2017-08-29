import React, { Component } from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { createArticles, deleteArticles, fetchArticlesIfNeeded } from '../../../actions/articles';
import { Input } from './FormFields';
import { trashBlanc } from '../../../images';

class Article extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      metaDesc: '',
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
      <div>
        <h2 className="admin__container-title">Mes articles</h2>
        <div className="admin__container-list">
          { articles.map(article => (
            <div className="admin__article-column" key={article._id}>
              <div className="admin__article">
                <div className="admin__article-header">
                  <h3 className="admin__article-title">{article.title}</h3>
                </div>
                <div className="admin__article-body">
                  <img src={article.thumbnail} alt="thumbnail" className="admin__article-thumbnail" />
                </div>
                <div className="admin__delete-btn admin__article-deleteButton" onClick={() => this.props.deleteArticles(article._id)}>
                  <img src={trashBlanc} alt="Supprimer" className="admin__delete-btn-icon" />
                </div>
              </div>
            </div>
          )) }
        </div>
        <div>
          <h2 className="admin__container-title">Ajouter un article</h2>
          <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
            <div className="admin__container-list">
              <div className="admin__field-column admin__field-column-2">
                <div className="material-field has-label">
                  <label htmlFor="banner" className="material__label">Bannière</label>
                  <input className="material__input admin__file" type="file" id="banner" name="banner" onChange={this.handleChange} />
                </div>
              </div>
              <div className="admin__field-column admin__field-column-2">
                <div className="material-field has-label">
                  <label htmlFor="thumbnail" className="material__label">Thumbnail</label>
                  <input className="material__input admin__file" type="file" id="thumbnail" name="thumbnail" onChange={this.handleChange} />
                </div>
              </div>
              <div className="admin__field-column admin__field-column-1">
                <img src="" id="preview" className="admin__preview" alt="Preview" />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input type="text" name="title" placeholder="Titre" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input type="text" name="meta-desc" placeholder="Meta description" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
              </div>
            </div>
            <div className="admin__field-column">
              <RichTextEditor
                value={this.state.text}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" onFocus={this.focusInput} onBlur={this.blurInput} className="btn-gold">Créer</button>
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

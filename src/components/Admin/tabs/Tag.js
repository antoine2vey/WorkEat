import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTagsIfNeeded, createTags, deleteTags } from '../../../actions/tags';
import { Input } from './FormFields';
import { trashBlanc } from '../../../images';

class Tag extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchTagsIfNeeded();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    this.props.createTags(name);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleDelete(tag) {
    const { _id } = tag;
    this.props.deleteTags(_id);
  }

  focusInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.add('is-focused');
  }

  blurInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.remove('is-focused');
  }

  render() {
    const { tags } = this.props;
    return (
      <div>
        <h2 className="admin__container-title">Mes tags</h2>
        <div className="admin__container-list">
          {
            tags.map(tag => (
              <div className="admin__tag-column" key={tag._id}>
                <div className="admin__tag">
                  <p className="admin__tag-text">{tag.name}</p>
                  <div className="admin__delete-btn" onClick={() => this.handleDelete(tag)}>
                    <img src={trashBlanc} alt="Supprimer" className="admin__delete-btn-icon" />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="admin__add-tag">
          <h2 className="admin__container-title">Nouveau tag</h2>
          <form method="POST" onSubmit={this.handleSubmit}>
            <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} />
            <button type="submit" className="btn-gold">Créer</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.tags.tags,
});

export default connect(mapStateToProps, {
  fetchTagsIfNeeded,
  createTags,
  deleteTags,
})(Tag);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import { fetchTagsIfNeeded, createTags, deleteTags, updateTag } from '../../../actions/tags';
import { Input } from './FormFields';
import { trashBlanc, edit } from '../../../images';

class Tag extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isUpdatePanelShown: false,
    };

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

  showUpdatePanel(tag) {
    document.body.classList.toggle('dont-scroll');
    this.setState({
      isUpdatePanelShown: !this.state.isUpdatePanelShown,
      ...tag,
    });
  }

  updateTag() {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isUpdatePanelShown: !this.state.isUpdatePanelShown });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.props.updateTag(omit(this.state, ['isUpdatePanelShown']));
    this.setState({ isUpdatePanelShown: !this.state.isUpdatePanelShown });
  }

  render() {
    const { tags } = this.props;
    return (
      <div>
        <h2 className="admin__container-title">Mes tags</h2>
        <div className={`admin__product-panel ${this.state.isUpdatePanelShown ? ' admin__product-panel--open' : ''}`}>
          <div className="admin__add-product">
            <h2 className="admin__container-title">Modification de {this.state.name}</h2>
            <form className="admin__form" encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
              <div className="admin__field-column admin__field-column-2">
                <Input value={this.state.name} type="text" name="name" placeholder="Nom" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
              </div>
              <div className="admin__field-column admin__field-column-2" />
              <button type="submit" className="btn-gold">Modifier</button>
            </form>
          </div>
        </div>
        <div className="admin__container-list">
          {
            tags.map(tag => (
              <div className="admin__tag-column" key={tag._id}>
                <div className="admin__tag">
                  <p className="admin__tag-text">{tag.name}</p>
                  <div className="admin__button-container">
                    <div className="admin__delete-btn" onClick={() => this.handleDelete(tag)}>
                      <img src={trashBlanc} alt="Supprimer" className="admin__delete-btn-icon" />
                    </div>
                    <div className="admin__update-btn" onClick={() => this.showUpdatePanel(tag)}>
                      <img src={edit} alt="Modifier" className="admin__update-btn-icon" />
                    </div>
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
  updateTag
})(Tag);

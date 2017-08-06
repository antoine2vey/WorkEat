import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsTags from '../../../actions/tags';
import * as actionsPlaces from '../../../actions/livraison';
import * as actionsProduct from '../../../actions/products';
import { Input, Select } from './FormFields';
import ProductList from './ProductList';
import { download } from '../../../images';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      file: '',
      name: '',
      description: '',
      preparation: '',
      allergics: [],
      price: '',
      types: [],
      tags: [],
      places: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchTagsIfNeeded, fetchPlacesIfNeeded } = this.props;
    fetchTagsIfNeeded();
    fetchPlacesIfNeeded();
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
    const { name, value, options } = event.target;
    switch (name) {
      case 'file': {
        const reader = new FileReader();
        const img = document.getElementById('preview');
        // eslint-disable-next-line
        const blob = reader.readAsDataURL(event.target.files[0]);

        reader.addEventListener('load', () => {
          img.src = reader.result;
          this.setState({ [name]: reader.result });
        });
        break;
      }
      case 'places':
      case 'types':
      case 'tags': {
        this.setState({ [name]: [...options].filter(option => option.selected).map(option => option.value) });
        break;
      }
      default: {
        this.setState({ [name]: value });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct(this.state);
  }

  render() {
    const { tags, places, types } = this.props;
    return (
      <div className="admin__products">
        <h2 className="admin__products-title">Mes produits</h2>
        <ProductList {...this.props} />
        <div className="admin__add-product">
          <h2 className="admin__products-title">Ajouter un produit</h2>
          <form className="admin__form" encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
            <div className="admin__field-column admin__field-column-2">
              <Input type="text" name="name" placeholder="Nom" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column  admin__field-column-2">
              <Input type="text" name="description" placeholder="Description" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column  admin__field-column-2">
              <Input type="text" name="preparation" placeholder="Preparation" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column  admin__field-column-2">
              <Input type="text" name="allergics" placeholder="Allergènes" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column  admin__field-column-1">
              <Input type="number" name="price" placeholder="Prix" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column admin__field-column-3">
              <Select label="Tags" name="tags" multiple data={tags} onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column admin__field-column-3">
              <Select label="Endroits" name="places" multiple data={places} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column admin__field-column-3">
              <Select label="Type" name="types" multiple flat data={types} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column admin__field-column-1 admin__file-container">
              <div className="admin__field-column admin__field-column-2">
                <div className="material-field has-label">
                  <label htmlFor="file" className="material__label">Photo</label>
                  {/* <span className="admin__file-name">{this.state.file.name}</span> */}
                  <input className="material__input admin__file" type="file" id="file" name="file" onChange={this.handleChange} />
                </div>
              </div>
              <div className="admin__field-column admin__field-column-2">
                <img src="" id="preview" style={{ maxWidth: 400 }} alt="Preview" />
              </div>
            </div>
            <input type="submit" value="Créer" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    tags: state.tags.tags,
    places: state.places.places,
    isFetching: state.products.isFetching,
    types: ['Entree', 'Plat', 'Dessert', 'Boisson'],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionsTags, ...actionsPlaces, ...actionsProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

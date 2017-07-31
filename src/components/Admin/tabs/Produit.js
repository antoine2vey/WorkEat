import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTagsIfNeeded } from '../../../actions/tags';
import { fetchPlacesIfNeeded } from '../../../actions/livraison';
import { createProduct, fetchProductsIfNeeded, deleteProducts } from '../../../actions/products';
import { Input, Select } from './FormFields';
import ProductList from './ProductList';

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
        reader.readAsDataURL(event.target.files[0]);

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
          <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="file" className="label">Photo</label>
              <p className="control">
                <input className="input" type="file" name="file" onChange={this.handleChange} />
              </p>
              <img src="" id="preview" style={{ maxWidth: 400 }} alt="Preview" />
            </div>
            <Input type="text" name="name" placeholder="Nom" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            <Input type="text" name="description" placeholder="Description" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            <Input type="text" name="preparation" placeholder="Preparation" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            <Input type="text" name="allergics" placeholder="Allergènes" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            <Input type="number" name="price" placeholder="Prix" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            <Select label="Tags" name="tags" multiple data={tags} onChange={this.handleChange} />
            <Select label="Endroits" name="places" multiple data={places} onChange={this.handleChange} />
            <Select label="Type" name="types" multiple flat data={types} onChange={this.handleChange} />
            <Input type="submit" value="Créer" onFocus={this.focusInput} onBlur={this.blurInput} className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  tags: state.tags.tags,
  places: state.places.places,
  isFetching: state.products.isFetching,
  types: ['Entree', 'Plat', 'Dessert', 'Boisson'],
});

export default connect(mapStateToProps, {
  fetchPlacesIfNeeded,
  fetchTagsIfNeeded,
  fetchProductsIfNeeded,
  createProduct,
  deleteProducts,
})(Product);

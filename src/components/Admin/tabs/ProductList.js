import React, { Component } from 'react';
import { trashBlanc, edit } from '../../../images';
import { Input, Select } from './FormFields';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      file: '',
      name: '',
      description: '',
      preparation: '',
      allergics: [],
      price: '',
      stock: '',
      types: [],
      tags: [],
      places: [],
      isUpdatePanelShown: false,
    };
  }
  componentDidMount() {
    this.props.fetchProductsIfNeeded();
  }

  deleteProduct(product) {
    const { _id } = product;
    this.props.deleteProducts(_id);
  }

  showUpdatePanel(product) {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isUpdatePanelShown: !this.state.isUpdatePanelShown });

    const { name, description, preparation, price, stock } = product;
    this.setState({
      name,
      description,
      preparation,
      price,
      stock,
    });
  }

  updateProduct() {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isUpdatePanelShown: !this.state.isUpdatePanelShown });
  }

  render() {
    const { products, tags, places, types } = this.props;
    return (
      <div>
        <div className={`admin__product-panel ${this.state.isUpdatePanelShown ? ' admin__product-panel--open' : ''}`}>
          <div className="admin__add-product">
            <h2 className="admin__container-title">Modification de {this.state.name}</h2>
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
              <div className="admin__field-column  admin__field-column-2">
                <Input type="number" name="price" placeholder="Prix" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
              </div>
              <div className="admin__field-column  admin__field-column-2">
                <Input type="number" name="stock" placeholder="Stock" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
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
                  <img src="" id="preview" className="admin__preview" alt="Preview" />
                </div>
              </div>
              <button type="submit" className="btn-gold" onClick={() => this.updateProduct()}>Modifier</button>
            </form>
          </div>
        </div>
        <div className="admin__container-list">
          {
            products.map(product => (
              <div className="admin__product-column" key={product._id}>
                <article className="admin__product">
                  <div className="admin__product-image-container">
                    <img className="admin__product-image" src={product.file} alt={product.name} />
                  </div>
                  <div className="admin__product-content">
                    <h2 className="admin__product-title">{product.name}</h2> <span className="admin__product-price">{product.price}€</span> <span className="admin__product-stock">{product.stock}</span>
                    {/* <div className="admin__product-desc">
                      {product.description}
                    </div> */}
                    <div className="admin__button-container">
                      <div className="admin__delete-btn" onClick={() => this.deleteProduct(product)}>
                        <img src={trashBlanc} alt="Supprimer" className="admin__delete-btn-icon" />
                      </div>
                      <div className="admin__update-btn" onClick={() => this.showUpdatePanel(product)}>
                        <img src={edit} alt="Modifier" className="admin__update-btn-icon" />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ProductList;

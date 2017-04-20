import React, { Component } from 'react';
import axios from 'axios';
import { Input, Select } from './FormFields';
import ProductList from './ProductList';

class Product extends Component {
  constructor() {
    super();
    this.state = {      
      selects: {
        tags: [],
        places: [],
        types: [],
      },
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
    const getTags = () => axios.get('/api/tags');
    const getPlaces = () => axios.get('/api/places');

    axios.all([getTags(), getPlaces()])
      .then(axios.spread((tags, places) => {
        this.setState({
          selects: {
            tags: tags.data,
            places: places.data,
            types: ['Entree', 'Plat', 'Dessert', 'Boisson'],
          },
        });
      }));
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
    delete this.state.selects;
    axios.post('/api/products', { ...this.state }, {
      headers: {
        Authorization: `Bearer ${localStorage._token}`,
      },
    })
    .then((res) => {
      this.setState({ nextProduct: res.data.product });
    })
    .then(err => console.log(err));
  }

  render() {
    const { selects: { tags, places, types } } = this.state;
    return (
      <div className="columns" style={{ justifyContent: 'center' }}>
        <div className="column">
          <ProductList />
        </div>
        <div className="column">
          <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="file" className="label">Photo</label>
              <p className="control">
                <input className="input" type="file" name="file" onChange={this.handleChange} />
              </p>
              <img src="" id="preview" style={{ maxWidth: 400 }} alt="Preview" />
            </div>
            <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} />
            <Input type="text" name="description" placeholder="Description" onChange={this.handleChange} />
            <Input type="text" name="preparation" placeholder="Preparation" onChange={this.handleChange} />
            <Input type="text" name="allergics" placeholder="Allergènes" onChange={this.handleChange} />
            <Input type="number" name="price" placeholder="Prix" onChange={this.handleChange} />
            <Select label="Tags" name="tags" multiple data={tags} onChange={this.handleChange} />
            <Select label="Endroits" name="places" multiple data={places} onChange={this.handleChange} />
            <Select label="Type" name="types" multiple flat data={types} onChange={this.handleChange} />
            <Input type="submit" value="Créer" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default Product;

import React, { Component } from 'react';
import { Input, Select } from './FormFields';
import axios from 'axios';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      selects: {
        tags: [],
        places: [],
        types: []
      },
      file: '',
      name: '',
      description: '',
      preparation: '',
      allergics: [],
      price: '',
      types: [],
      tags: [],
      places: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value, options } = event.target;    
    console.log(name);
    switch (name) {
      case 'file':
        const reader = new FileReader();
        const img = document.getElementById('preview');
        const blob = reader.readAsDataURL(event.target.files[0]);

        reader.addEventListener('load', () => {
          img.src = reader.result;
          this.setState({ [name]: reader.result });
        });
        break;
      case 'places':
      case 'types':
      case 'tags':        
        this.setState({ [name]: [...options].filter(option => option.selected).map(option => option.value) })
        break;
      default:
        this.setState({ [name]: value });
    }
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
            types: ['Entree', 'Plat', 'Dessert', 'Boisson']
          }
        })
      }))
  }


  handleSubmit(event) {
    event.preventDefault();    
    delete this.state.selects;
    axios.post('/api/products', {...this.state}, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(product => console.log(product))
    .then(err => console.log(err))
  }

  render() {
    const { selects: { tags, places, types } } = this.state;
    return (
      <div className="columns" style={{justifyContent: 'center'}}>
        <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit.bind(this)}>
          <div className="column">
            <div className="field">
              <label className="label">Photo</label>
              <p className="control">
                <input className="input" type="file" name="file" onChange={this.handleChange} />
              </p>
              <img src="" id="preview" style={{maxWidth: 400}}/>
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
          </div>
        </form>
      </div>
    );
  }
}

export default Product;

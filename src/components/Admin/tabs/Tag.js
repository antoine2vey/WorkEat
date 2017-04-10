import React, { Component } from 'react';
import { Input } from './FormFields';
import axios from 'axios';

class Tag extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      tag: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
  handleChange(event) {
    event.preventDefault();
  }

  handleDelete(tag, index) {
    const { _id } = tag;
    axios.delete(`/api/tags/${_id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then(res => {
        this.setState({
          tags: this.state.tags.filter((_,i) => i !== index)
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    axios.get('/api/tags')
      .then(tags => this.setState({ tags: tags.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { tags } = this.state;
    return (
      <div className="columns" style={{justifyContent: 'center'}}>
        <div className="column">
          <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit.bind(this)}>
            <div className="column">            
              <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} />
              <Input type="submit" value="Créer" className="btn" />
            </div>
          </form>
        </div>
        <div className="column">
          {
            tags.map((tag, i) => (
              <span className="tag is-danger is-large" key={tag._id} style={{marginRight: 10, marginBottom: 10}}>
                {tag.name}
                <button className="delete" style={{padding:0}} onClick={() => this.handleDelete(tag, i)}></button>
              </span>              
            ))
          } 
        </div>
      </div>
    );
  }
}

export default Tag;

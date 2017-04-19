import React, { Component } from 'react';
import axios from 'axios';
import { Input } from './FormFields';

class Tag extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/tags')
      .then(tags => this.setState({ tags: tags.data }))
      .catch(err => console.log(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/tags', { name: this.state.name })
    .then(res => console.info(res))
    .catch(err => console.error(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleDelete(tag, index) {
    const { _id } = tag;
    axios.delete(`/api/tags/${_id}`)
      .then(() => {
        this.setState({
          tags: this.state.tags.filter((_, i) => i !== index),
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { tags } = this.state;
    return (
      <div className="columns" style={{ justifyContent: 'center' }}>
        <div className="column">
          <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
            <div className="column">
              <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} />
              <Input type="submit" value="Créer" className="btn" />
            </div>
          </form>
        </div>
        <div className="column">
          {
            tags.map((tag, i) => (
              <span className="tag is-danger is-large" key={tag._id} style={{ marginRight: 10, marginBottom: 10 }}>
                {tag.name}
                <button className="delete" style={{ padding: 0 }} onClick={() => this.handleDelete(tag, i)} />
              </span>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Tag;

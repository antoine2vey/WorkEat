import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTagsIfNeeded, createTags, deleteTags } from '../../../actions/tags';
import { Input } from './FormFields';

class Tag extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    const { tags } = this.props;
    return (
      <div className="columns" style={{ justifyContent: 'center' }}>
        <div className="column">
          <form method="POST" onSubmit={this.handleSubmit}>
            <div className="column">
              <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} />
              <Input type="submit" value="Créer" className="btn" />
            </div>
          </form>
        </div>
        <div className="column">
          {
            tags.map(tag => (
              <span className="tag is-danger is-large" key={tag._id} style={{ marginRight: 10, marginBottom: 10 }}>
                {tag.name}
                <button className="delete" style={{ padding: 0 }} onClick={() => this.handleDelete(tag)} />
              </span>
            ))
          }
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

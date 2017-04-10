import React, { Component } from 'react';

class Product extends Component {  
  render() {
    console.log(this.props.data);
    const { file, description, price, tags, types, name } = this.props.data;
    console.log(this.props);
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={file ? file : "http://bulma.io/images/placeholders/1280x960.png"} alt="Images" style={{objectFit: 'cover'}}/>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{ name }</p>
              <p className="subtitle is-6">{ price }€</p>
            </div>
          </div>

          <div className="content">
            {description} <br />
            { tags.map(tag => (<a href="#" key={tag._id}>#{tag.name} </a>)) }
            <br />
            { types.map((type, i) => (<small key={i}>{type}{type.length - 1 === i ? '' : ' - '}</small>)) }
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
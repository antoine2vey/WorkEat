import React, { Component } from 'react';

class Product extends Component {  
  render() {
    console.log(this.props.data);
    const { description, price, tag, type, name } = this.props.data;
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Images" />
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
            { tag.map(t => (<a href="#" key={t._id}>#{t.name} </a>)) }
            <br />
            { type.map((t, i) => (<small key={i}>{t}{t.length - 1 === i ? '' : ' - '}</small>)) }
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
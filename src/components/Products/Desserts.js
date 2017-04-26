import React from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import { addToCart } from '../../actions/cart';

const Dessert = ({ dessert: { file, description, price, tags, types, name }, addToCart }) => (
  <div className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={`/${file}` || 'http://bulma.io/images/placeholders/1280x960.png'} alt="Images" style={{ objectFit: 'cover' }} />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">{ name } <a onClick={addToCart}>Ajouter au panier</a></p>
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

const Desserts = ({ ...props }) => {
  const { desserts, addToCart } = props;
  const rows = chunk(desserts, 4);

  return (
    <div>
      { rows.map((row, i) => (
        <div
          className="columns" key={i} style={{
            marginLeft: i !== 0 ? 0 : 'auto',
          }}
        >
          { row.map(dessert => (
            <div className="column is-3" key={dessert._id} style={{ margin: 0 }}>
              <Dessert dessert={dessert} addToCart={() => addToCart(dessert._id)} />
            </div>
          )) }
        </div>
      )) }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addToCart(id) {
    dispatch(addToCart(id));
  },
});

export default connect(() => ({}), mapDispatchToProps)(Desserts);

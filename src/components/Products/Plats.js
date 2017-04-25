import React from 'react';
import chunk from 'lodash/chunk';

const Plat = ({ plat: { file, description, price, tags, types, name } }) => (
  <div className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={`/${file}` || 'http://bulma.io/images/placeholders/1280x960.png'} alt="Images" style={{ objectFit: 'cover' }} />
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

const Plats = ({ ...props }) => {
  const { plats } = props;
  const rows = chunk(plats, 4);

  return (
    <div>
      { rows.map((row, i) => (
        <div
          className="columns" key={i} style={{
            marginLeft: i !== 0 ? 0 : 'auto',
          }}
        >
          { row.map(plat => (
            <div className="column is-3" key={plat._id} style={{ margin: 0 }}>
              <Plat plat={plat} />
            </div>
          )) }
        </div>
      )) }
    </div>
  );
};

export default Plats;

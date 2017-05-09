/* eslint jsx-a11y/href-no-hash: "off" */
import React from 'react';

const Bundle = ({ bundle, products }) => (
  <div className="card" style={{height: 'auto'}}>
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">{ bundle.name }</p>
          <p className="subtitle is-6">{ bundle.price }€</p>
        </div>
      </div>
      <div className="content">
        { bundle.items.hasEntree &&
        <div>
          <label htmlFor="entree">entree</label>
          <select name="entree" id="entree">
            { products.filter(product => product.types.indexOf('entree') > -1).map(entree => (
              <option value={entree._id} key={entree._id}>{entree.name}</option>
            ))}
          </select>
        </div> }
        <br/>
        { bundle.items.hasPlat &&
        <div>
          <label htmlFor="plat">plat</label>
          <select name="plat" id="plat">
            { products.filter(product => product.types.indexOf('plat') > -1).map(plat => (
              <option value={plat._id} key={plat._id}>{plat.name}</option>
            ))}
          </select>
        </div> }
        <br/> 
        { bundle.items.hasDessert &&
        <div>
          <label htmlFor="dessert">dessert</label>
          <select name="dessert" id="dessert">
            { products.filter(product => product.types.indexOf('dessert') > -1).map(dessert => (
              <option value={dessert._id} key={dessert._id}>{dessert.name}</option>
            ))}
          </select>
        </div> }
        <br/>
        { bundle.items.hasBoisson &&
        <div>
          <label htmlFor="boisson">boisson</label>
          <select name="boisson" id="boisson">
            { products.filter(product => product.types.indexOf('boisson') > -1).map(boisson => (
              <option value={boisson._id} key={boisson._id}>{boisson.name}</option>
            ))}
          </select>
        </div> }
      </div>
    </div>
  </div>
);

export default Bundle;

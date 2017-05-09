/* eslint jsx-a11y/href-no-hash: "off" */
import React from 'react';

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  render() {
    const { bundle, products } = this.props;
    return (
      <div className="formules">
        <div className="formules__row">
          <div className="formules__column">
            <div className="formules__container">
              <div className="formules__content">
                <p className="formules__title is-4">{ bundle.name }</p>
                <p className="formule__price is-6">{ bundle.price }€</p>
                {/* <p className="formule__desc">{ bundle.desc }</p> */}

                <div className="content">

                </div>
              </div>
            </div>
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
    );
  }
}

export default Bundle;

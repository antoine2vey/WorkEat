/* eslint jsx-a11y/href-no-hash: "off" */
import React from 'react';

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };

    this.selectEntree = this.selectEntree.bind(this);
    this.selectPlat = this.selectPlat.bind(this);
    this.selectDessert = this.selectDessert.bind(this);
    this.selectBoisson = this.selectBoisson.bind(this);
  }

  selectEntree(entree) {
    alert(entree);
  }

  selectPlat(entree) {
    alert(entree);
  }

  selectDessert(entree) {
    alert(entree);
  }

  selectBoisson(entree) {
    alert(entree);
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
                <p className="formules__price is-6">{ bundle.price }€</p>
              </div>
              <div className="formules__choise">
                { bundle.items.hasEntree &&
                <div>
                  <label htmlFor="entree">entree</label>
                  <div name="entree" id="entree" className="formules__select active">
                    { products.filter(product => product.types.indexOf('entree') > -1).map(entree => (
                      <div id={entree._id} key={entree._id} className="formules__item" onClick={() => this.selectEntree(entree)}>
                        <div className="formules__item-image">
                          <img src={entree.file} alt={entree.name} />
                        </div>
                        <div className="formules__item-infos">
                          <h3 className="formules__item-title">{entree.name}</h3>
                          <p className="formules__item-desc">{
                            entree.tags.map(tag => (
                              <span key={tag._id}>{tag.name}, </span>
                            ))
                          }</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> }
                {/* { bundle.items.hasEntree &&
                <div>
                  <label htmlFor="entree">entree</label>
                  <select name="entree" id="entree" className="formules__select">
                    { products.filter(product => product.types.indexOf('entree') > -1).map(entree => (
                      <option value={entree._id} key={entree._id}>{entree.name}</option>
                    ))}
                  </select>
                </div> } */}
                { bundle.items.hasPlat &&
                <div>
                  <label htmlFor="plat">plat</label>
                  <div name="plat" id="plat" className="formules__select active">
                    { products.filter(product => product.types.indexOf('plat') > -1).map(plat => (
                      <div id={plat._id} key={plat._id} className="formules__item" onClick={() => this.selectPlat(plat)}>
                        <div className="formules__item-image">
                          <img src={plat.file} alt={plat.name} />
                        </div>
                        <div className="formules__item-infos">
                          <h3 className="formules__item-title">{plat.name}</h3>
                          <p className="formules__item-desc">{
                            plat.tags.map(tag => (
                              <span key={tag._id}>{tag.name}, </span>
                            ))
                          }</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> }
                {/* { bundle.items.hasPlat &&
                <div>
                  <label htmlFor="plat">plat</label>
                  <select name="plat" id="plat">
                    { products.filter(product => product.types.indexOf('plat') > -1).map(plat => (
                      <option value={plat._id} key={plat._id}>{plat.name}</option>
                    ))}
                  </select>
                </div> } */}
                { bundle.items.hasDessert &&
                <div>
                  <label htmlFor="dessert">plat</label>
                  <div name="dessert" id="dessert" className="formules__select active">
                    { products.filter(product => product.types.indexOf('dessert') > -1).map(dessert => (
                      <div id={dessert._id} key={dessert._id} className="formules__item" onClick={() => this.selectDessert(dessert)}>
                        <div className="formules__item-image">
                          <img src={dessert.file} alt={dessert.name} />
                        </div>
                        <div className="formules__item-infos">
                          <h3 className="formules__item-title">{dessert.name}</h3>
                          <p className="formules__item-desc">{
                            dessert.tags.map(tag => (
                              <span key={tag._id}>{tag.name}, </span>
                            ))
                          }</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> }
                {/* { bundle.items.hasDessert &&
                <div>
                  <label htmlFor="dessert">dessert</label>
                  <select name="dessert" id="dessert">
                    { products.filter(product => product.types.indexOf('dessert') > -1).map(dessert => (
                      <option value={dessert._id} key={dessert._id}>{dessert.name}</option>
                    ))}
                  </select>
                </div> } */}
                { bundle.items.hasBoisson &&
                <div>
                  <label htmlFor="boisson">plat</label>
                  <div name="boisson" id="boisson" className="formules__select active">
                    { products.filter(product => product.types.indexOf('boisson') > -1).map(boisson => (
                      <div id={boisson._id} key={boisson._id} className="formules__item" onClick={() => this.selectBoisson(boisson)}>
                        <div className="formules__item-image">
                          <img src={boisson.file} alt={boisson.name} />
                        </div>
                        <div className="formules__item-infos">
                          <h3 className="formules__item-title">{boisson.name}</h3>
                          <p className="formules__item-desc">{
                            boisson.tags.map(tag => (
                              <span key={tag._id}>{tag.name}, </span>
                            ))
                          }</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> }
                {/* { bundle.items.hasBoisson &&
                <div>
                  <label htmlFor="boisson">boisson</label>
                  <select name="boisson" id="boisson">
                    { products.filter(product => product.types.indexOf('boisson') > -1).map(boisson => (
                      <option value={boisson._id} key={boisson._id}>{boisson.name}</option>
                    ))}
                  </select>
                </div> } */}
              </div>
              <button className="btn-gold">Commander</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bundle;

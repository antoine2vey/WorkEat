/* eslint jsx-a11y/href-no-hash: "off" */
import React from 'react';

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      entree: {
        active: false,
        choisie: {},
      },
      plat: {
        active: false,
        choisie: {},
      },
      dessert: {
        active: false,
        choisie: {},
      },
      boisson: {
        active: false,
        choisie: {},
      },
    };

    this.toggleEntree = this.toggleEntree.bind(this);
    this.togglePlat = this.togglePlat.bind(this);
    this.toggleDessert = this.toggleDessert.bind(this);
    this.toggleBoisson = this.toggleBoisson.bind(this);
  }

  toggleEntree(entree) {
    this.setState({
      entree: {
        active: !this.state.entree.active,
        choisie: entree,
      },
    });
  }

  togglePlat(plat) {
    this.setState({
      plat: {
        active: !this.state.plat.active,
        choisie: plat,
      },
    });
  }

  toggleDessert(dessert) {
    this.setState({
      dessert: {
        active: !this.state.dessert.active,
        choisie: dessert,
      },
    });
  }

  toggleBoisson(boisson) {
    this.setState({
      boisson: {
        active: !this.state.boisson.active,
        choisie: boisson,
      },
    });
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
                  <div className="formules__input">
                    <label htmlFor="entree" onClick={this.toggleEntree} className="formules__label">entree {this.state.entree.choisie.name ? ` - ${this.state.entree.choisie.name}` : ''}</label>
                    <div name="entree" id="entree" className={'formules__select' + (this.state.entree.active ? ' current' : '')}>
                      { products.filter(product => product.types.indexOf('entree') > -1).map(entree => (
                        <div id={entree._id} key={entree._id} className="formules__item" onClick={() => this.toggleEntree(entree)}>
                          <div className="formules__item-container">
                            <img className="formules__item-image" src={entree.file} alt={entree.name} />
                          </div>
                          <div className="formules__item-infos">
                            <h3 className="formules__item-title">{entree.name}</h3>
                            <p className="formules__item-desc">{
                              entree.tags.map(tag => (
                                <span key={tag._id}>{tag.name}, </span>
                              ))
                            }</p>
                            <p className="formules__item-allergenes">{
                              entree.allergics.map((allergic, i) => (
                                <span key={i}>{allergic}, </span>
                              ))
                            }</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
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
                  <div className="formules__input">
                      <label htmlFor="plat" onClick={this.togglePlat} className="formules__label">plat {this.state.plat.choisie.name ? ` - ${this.state.plat.choisie.name}` : ''}</label>
                    <div name="plat" id="plat" className={'formules__select' + (this.state.plat.active ? ' current' : '')}>
                      { products.filter(product => product.types.indexOf('plat') > -1).map(plat => (
                        <div id={plat._id} key={plat._id} className="formules__item" onClick={() => this.togglePlat(plat)}>
                          <div className="formules__item-container">
                            <img className="formules__item-image" src={plat.file} alt={plat.name} />
                          </div>
                          <div className="formules__item-infos">
                            <h3 className="formules__item-title">{plat.name}</h3>
                            <p className="formules__item-desc">{
                              plat.tags.map(tag => (
                                <span key={tag._id}>{tag.name}, </span>
                              ))
                            }</p>
                            <p className="formules__item-allergenes">{
                              plat.allergics.map((allergic, i) => (
                                <span key={i}>{allergic}, </span>
                              ))
                            }</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
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
                  <div className="formules__input">
                    <label htmlFor="dessert" onClick={this.toggleDessert} className="formules__label">dessert {this.state.dessert.choisie.name ? ` - ${this.state.dessert.choisie.name}` : ''}</label>
                    <div name="dessert" id="dessert" className={'formules__select' + (this.state.dessert.active ? ' current' : '')}>
                      { products.filter(product => product.types.indexOf('dessert') > -1).map(dessert => (
                        <div id={dessert._id} key={dessert._id} className="formules__item" onClick={() => this.toggleDessert(dessert)}>
                          <div className="formules__item-container">
                            <img className="formules__item-image" src={dessert.file} alt={dessert.name} />
                          </div>
                          <div className="formules__item-infos">
                            <h3 className="formules__item-title">{dessert.name}</h3>
                            <p className="formules__item-desc">{
                              dessert.tags.map(tag => (
                                <span key={tag._id}>{tag.name}, </span>
                              ))
                            }</p>
                            <p className="formules__item-allergenes">{
                              dessert.allergics.map((allergic, i) => (
                                <span key={i}>{allergic}, </span>
                              ))
                            }</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
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
                  <div className="formules__input">
                    <label htmlFor="boisson" onClick={this.toggleBoisson} className="formules__label">boisson {this.state.boisson.choisie.name ? ` - ${this.state.boisson.choisie.name}` : ''}</label>
                    <div name="boisson" id="boisson" className={'formules__select' + (this.state.boisson.active ? ' current' : '')}>
                      { products.filter(product => product.types.indexOf('boisson') > -1).map(boisson => (
                        <div id={boisson._id} key={boisson._id} className="formules__item" onClick={() => this.toggleBoisson(boisson)}>
                          <div className="formules__item-container">
                            <img className="formules__item-image" src={boisson.file} alt={boisson.name} />
                          </div>
                          <div className="formules__item-infos">
                            <h3 className="formules__item-title">{boisson.name}</h3>
                            <p className="formules__item-desc">{
                              boisson.tags.map(tag => (
                                <span key={tag._id}>{tag.name}, </span>
                              ))
                            }</p>
                            <p className="formules__item-allergenes">{
                              boisson.allergics.map((allergic, i) => (
                                <span key={i}>{allergic}, </span>
                              ))
                            }</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
                {/* { bundle.items.hasBoisson &&
                <div>
                  <label htmlFor="boisson">boisson</label>
                  <select name="boisson" id="boisson">
                    { products.filter(product => product.types.indexOf('boisson') > -1).map(boisson => (
                      <option value={boisson._id} key={boisson._id}>{boisson.name}</option>
                    ))}
                  </select>
                </div> } */}
                <button className="btn-gold formules__submit">Commander</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bundle;

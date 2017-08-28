import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBundlesIfNeeded, deleteBundles, createBundles } from '../../../actions/bundles';
import { Input, CheckBox } from './FormFields';

class Formule extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      hasEntree: false,
      hasPlat: false,
      hasDessert: false,
      hasBoisson: false,
      price: '',
      reduction: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
  }

  componentDidMount() {
    const { fetchBundlesIfNeeded } = this.props;
    fetchBundlesIfNeeded();
  }

  handleChange(event) {
    const { name, value, checked } = event.target;
    if (checked || value === 'on') {
      return this.setState({ [name]: !this.state[name] });
    }
    this.setState({ [name]: value });
  }

  focusInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.add('is-focused');
  }

  blurInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.remove('is-focused');
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name,
      description,
      hasBoisson,
      hasDessert,
      hasEntree,
      hasPlat,
      price,
      reduction,
    } = this.state;
    const bundle = {
      name,
      description,
      reduction,
      price,
      items: {
        hasEntree, hasPlat, hasDessert, hasBoisson,
      },
    };

    this.props.createBundles(bundle);
  }

  render() {
    const { bundles } = this.props;
    return (
      <div>
        <h2 className="admin__container-title">Mes formules</h2>
        <div className="admin__container-list">
          {
            bundles.map(bundle => (
              <div className="admin__formule-column" key={bundle._id}>
                <div className="admin__formule">
                  <div className="admin__formule-header">
                    <h3 className="admin__formule-title">
                      {bundle.name}
                    </h3>
                    <span className="admin__formule-price">
                      {bundle.price}€
                    </span>
                  </div>
                  <div className="admin__formule-body">
                    { bundle.items.hasEntree && <p className="admin__formule-type">Ce bundle possède une entrée</p> }
                    { bundle.items.hasPlat && <p className="admin__formule-type">Ce bundle possède un plat</p> }
                    { bundle.items.hasDessert && <p className="admin__formule-type">Ce bundle possède un dessert</p> }
                    { bundle.items.hasBoisson && <p className="admin__formule-type">Ce bundle possède une boisson</p> }
                  </div>
                  <div className="card-footer">
                    <a className="card-footer-item"><strong>{bundle.reduction ? `${bundle.reduction}% de réduction` : 'Pas de réduction pour le bundle'}</strong></a>
                    <button className="btn-red" onClick={() => this.props.deleteBundles(bundle._id)}>Supprimer</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div>
          <h2 className="admin__container-title">Ajouter une formule</h2>
          <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
            <div className="admin__container-list">
              <div className="admin__field-column admin__field-column-2">
                <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input type="text" name="description" placeholder="Description" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input type="number" name="price" placeholder="Prix" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input type="number" name="reduction" placeholder="Reduction (en %)" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} max="100" min="0" />
              </div>
              <div className="admin__field-column admin__field-column-4">
                <CheckBox name="hasEntree" onChange={this.handleChange}>
                  Ce bundle possède une entrée
                </CheckBox>
              </div>
              <div className="admin__field-column admin__field-column-4">
                <CheckBox name="hasPlat" onChange={this.handleChange}>
                  Ce bundle possède un plat
                </CheckBox>
              </div>
              <div className="admin__field-column admin__field-column-4">
                <CheckBox name="hasDessert" onChange={this.handleChange}>
                  Ce bundle possède un dessert
                </CheckBox>
              </div>
              <div className="admin__field-column admin__field-column-4">
                <CheckBox name="hasBoisson" onChange={this.handleChange}>
                  Ce bundle possède une boisson
                </CheckBox>
              </div>
              <button type="submit" className="btn-gold">Créer</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bundles: { bundles, isFetching } }) => ({
  bundles,
  isFetching,
});

export default connect(mapStateToProps, {
  fetchBundlesIfNeeded,
  createBundles,
  deleteBundles,
})(Formule);

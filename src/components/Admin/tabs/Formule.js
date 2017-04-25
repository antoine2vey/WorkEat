import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/bundles';
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
      <div className="columns" style={{ justifyContent: 'center' }}>
        <div className="column">
          {
            bundles.map(bundle => (
              <div className="card" key={bundle._id} style={{ marginLeft: 30, marginBottom: 15 }}>
                <header className="card-header">
                  <p className="card-header-title">
                    {bundle.name}
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    { bundle.items.hasEntree && <p>Ce bundle possède une entrée</p> }
                    { bundle.items.hasPlat && <p>Ce bundle possède un plat</p> }
                    { bundle.items.hasDessert && <p>Ce bundle possède un dessert</p> }
                    { bundle.items.hasBoisson && <p>Ce bundle possède une boisson</p> }
                  </div>
                </div>
                <footer className="card-footer">
                  <a className="card-footer-item"><strong>{bundle.price}€</strong></a>
                  <a className="card-footer-item"><strong>{bundle.reduction ? `${bundle.reduction}% de réduction` : ''}</strong></a>
                  <a className="card-footer-item" onClick={() => this.props.deleteBundles(bundle._id)}>Delete</a>
                </footer>
              </div>
            ))
          }
        </div>
        <div className="column">
          <form encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
            <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} />
            <Input type="text" name="description" placeholder="Description" onChange={this.handleChange} />
            <Input type="number" name="price" placeholder="Prix" onChange={this.handleChange} />
            <Input type="number" name="reduction" placeholder="Reduction (en %)" onChange={this.handleChange} max="100" min="0" />
            <CheckBox name="hasEntree" onChange={this.handleChange}>
              Ce bundle possède une entrée
            </CheckBox>
            <CheckBox name="hasPlat" onChange={this.handleChange}>
              Ce bundle possède un plat
            </CheckBox>
            <CheckBox name="hasDessert" onChange={this.handleChange}>
              Ce bundle possède un dessert
            </CheckBox>
            <CheckBox name="hasBoisson" onChange={this.handleChange}>
              Ce bundle possède une boisson
            </CheckBox>
            <Input type="submit" value="Créer" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bundles, isFetching } = state.bundles;
  return {
    bundles, isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Formule);

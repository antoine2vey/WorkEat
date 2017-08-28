import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilteredProducts } from '../../actions/products';

class Search extends Component {
  constructor(props) {
    super(props);

    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
  }

  focusInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.add('is-focused');
  }

  blurInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.remove('is-focused');
  }

  filterStore(event) {
    this.props.getFilteredProducts(event.target.value);
  }

  render() {
    const { shown } = this.props;
    return (
      <div>
        <div className={shown ? 'search-panel search-panel--open' : 'search-panel'}>
          <div className="material-field search-panel__input has-label">
            <div className="material-field__label">Quel produit recherchez-vous</div>
            <input type="text" className="material-field__input" onFocus={this.focusInput} onBlur={this.blurInput} onChange={(event) => this.filterStore(event)} />
          </div>
          <button className="btn-gold search-panel__submit">
            Rechercher
          </button>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { getFilteredProducts })(Search);

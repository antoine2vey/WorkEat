/* eslint jsx-a11y/href-no-hash: "off" */
import React from 'react';
import Select from '../Admin/tabs/FormFields';

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
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
      </div>
    )
  }
}

export default Bundle;

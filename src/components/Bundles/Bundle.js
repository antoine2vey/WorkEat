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
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{ bundle.name }</p>
              <p className="subtitle is-6">{ bundle.price }€</p>
            </div>
          </div>

          <div className="content">
            
          </div>
        </div>
      </div>
    )
  }
}

export default Bundle;

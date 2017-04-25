/* eslint jsx-a11y/href-no-hash: "off" */
import React from 'react';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.products !== this.state.products) {
      this.setState({ products: nextProps.products });
    }
  }

  render() {
    const { bundle } = this.props;
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

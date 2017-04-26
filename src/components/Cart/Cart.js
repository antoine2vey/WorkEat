import React, { Component } from 'react';
import axios from 'axios';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: []
    };
  }

  componentDidMount() {
    axios.get('/api/cart')
      .then(data => {
        this.setState({cart: data.data});
      });
  }

  render() {
    return (
      <div>
        <code>
         {JSON.stringify(this.state.cart)}
        </code>
      </div>
    );
  }
}

export default Cart;


import React, { Component } from 'react';
import { LoginBox, ConnectionBox } from './Boxes';

class RenderLoginBox extends Component {  
  render() {
    const { isLoggingIn } = this.props;
  
    return (
      <div>      
        { isLoggingIn ? <LoginBox /> : <ConnectionBox /> }      
      </div>
    );
  }
};

export default RenderLoginBox;
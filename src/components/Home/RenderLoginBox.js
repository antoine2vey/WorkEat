import React, { Component } from 'react';
import { LoginBox, ConnectionBox } from './Boxes';
import { Route } from 'react-router-dom';

class RenderLoginBox extends Component {  
  render() {
    const { isLoggingIn } = this.props;
  
    return (
      <div>      
        <Route render={({ history }) => (
          isLoggingIn ? <LoginBox history={history} /> : <ConnectionBox history={history} />
        )} />
      </div>
    );
  }
};

export default RenderLoginBox;
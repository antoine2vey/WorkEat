import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LoginBox, ConnectionBox } from './Boxes';

class RenderLoginBox extends Component {
  render() {
    const { isLoggingIn } = this.props;

    return (
      <div>
        <Route
          render={({ history }) => (
          isLoggingIn ? <LoginBox history={history} /> : <ConnectionBox history={history} />
        )}
        />
      </div>
    );
  }
}

export default RenderLoginBox;

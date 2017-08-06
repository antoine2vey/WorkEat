import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { LoginBox, ConnectionBox } from './Boxes';

const RenderLoginBox = ({ isLoggingIn, loginUser }) => (
  <div>
    <Route
      render={({ history }) => (
        isLoggingIn ? <LoginBox history={history} loginUser={loginUser} /> : <ConnectionBox history={history} />
      )}
    />
  </div>
);

export default connect(() => ({}), { loginUser })(RenderLoginBox);

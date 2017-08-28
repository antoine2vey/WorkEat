import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, resetPassword } from '../../actions/auth';
import { LoginBox, ConnectionBox } from './Boxes';

const RenderLoginBox = ({ isLoggingIn, loginUser, resetPassword }) => (
  <div>
    <Route
      render={({ history }) => (
        isLoggingIn ? <LoginBox history={history} loginUser={loginUser} resetPassword={resetPassword} /> : <ConnectionBox history={history} />
      )}
    />
  </div>
);

export default connect(() => ({}), { loginUser, resetPassword })(RenderLoginBox);

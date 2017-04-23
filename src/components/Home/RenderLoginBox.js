import React from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
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

function mapStateToProps(state) {
  return {
    unknown: 'uknw',
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderLoginBox);

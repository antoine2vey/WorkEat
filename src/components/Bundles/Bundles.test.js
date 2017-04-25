import React from 'react';
import ReactDOM from 'react-dom';
import Bundles from './Bundles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bundles />, div);
});


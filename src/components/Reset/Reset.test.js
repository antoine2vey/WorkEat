import React from 'react';
import ReactDOM from 'react-dom';
import Reset from './Reset';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Reset />, div);
});


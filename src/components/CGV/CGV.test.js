import React from 'react';
import ReactDOM from 'react-dom';
import CGV from './CGV';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CGV />, div);
});


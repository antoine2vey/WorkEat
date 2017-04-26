import React from 'react';
import ReactDOM from 'react-dom';
import Prestataire from './Prestataire';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Prestataire />, div);
});


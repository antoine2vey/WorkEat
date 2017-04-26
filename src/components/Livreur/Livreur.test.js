import React from 'react';
import ReactDOM from 'react-dom';
import Livreur from './Livreur';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Livreur />, div);
});


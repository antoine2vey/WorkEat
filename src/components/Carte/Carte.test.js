import React from 'react';
import ReactDOM from 'react-dom';
import Carte from './Carte';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Carte />, div);
});


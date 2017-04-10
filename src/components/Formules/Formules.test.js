import React from 'react';
import ReactDOM from 'react-dom';
import Formules from './Formules';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Formules />, div);
});


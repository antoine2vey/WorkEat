import React from 'react';
import ReactDOM from 'react-dom';
import Mention from './Mention';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mention />, div);
});


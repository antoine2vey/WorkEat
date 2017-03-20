#!/bin/bash
path='src/components'
mkdir $path/$1 && cd $path/$1
touch $1.scss
echo "import React, { Component } from 'react';
import './$1.css';

class $1 extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default $1;
" > $1.js

echo "import React from 'react';
import ReactDOM from 'react-dom';
import $1 from './$1';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<$1 />, div);
});
" > $1.test.js
#!/bin/bash
path='src/components'
mkdir $path/$1 && cd $path/$1
touch index.js
touch $1.html
echo "export default function() {
}
" > index.js

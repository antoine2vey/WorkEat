#!/usr/bin/env bash
if [ "${TRAVIS_PULL_REQUEST}" == "false" ] && [ "${TRAVIS_BRANCH}" == "master" ]; then
  echo "Clears git information"
  rm -rf .git
  echo "Writing custom gitignore for build"
  echo "node_modules/" >> .gitignore
  echo "deploy_key.*" >> .gitignore
  cat .gitignore
  echo "Sets up package for sending"
  
  git init
  git remote add deploy $DEPLOY_URI
  git config user.name $DEPLOY_USER
  git config user.email $DEPLOY_EMAIL
  git add --all .
  git commit -m "Deploy from Travis - build {$TRAVIS_BUILD_NUMBER}"
  echo "Sets up permissions"
  echo -e "Host comments.reynrick.com\n\tStrictHostKeyChecking no" >> ~/.ssh/config
  openssl aes-256-cbc -K $encrypted_a9d53792e855_key -iv $encrypted_a9d53792e855_iv -in deploy-key.enc -out deploy-key.pem -d
  eval "$(ssh-agent -s)"
  chmod 600 deploy-key.pem
  ssh-add deploy-key.pem
  echo "Sends build"
  git push -f deploy master
fi
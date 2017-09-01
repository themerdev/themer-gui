#!/bin/bash
set -ev

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
  docker run --rm -ti -v ${PWD}:/project -v ${PWD##*/}-node-modules:/project/node_modules \
    -v ~/.cache/electron:/root/.cache/electron \
    ~/.cache/electron-builder:/root/.cache/electron-builder \
    electronuserland/electron-builder:wine /bin/bash -c "yarn && yarn dist"
fi

if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
  yarn && yarn dist
fi

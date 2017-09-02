#!/bin/bash
set -ev

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
  sudo apt-get install --no-install-recommends -y icnsutils graphicsmagick xz-utils
  yarn && yarn dist
fi

if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
  yarn && yarn dist -- --mac --win
fi

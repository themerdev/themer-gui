#!/bin/bash
set -ev

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
  sudo add-apt-repository ppa:ubuntu-wine/ppa -y
  sudo apt-get update
  sudo apt-get install --no-install-recommends -y icnsutils graphicsmagick xz-utils wine1.8
  yarn && yarn dist -- --linux --win
fi

if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
  yarn && yarn dist
fi

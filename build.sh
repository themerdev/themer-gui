#!/bin/bash
set -ev

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
  sudo apt-get install --no-install-recommends -y icnsutils graphicsmagick xz-utils
fi

yarn && yarn dist

#!/usr/bin/env bash

pushd content/usr/lib/efa2

wget -q -O efa.zip http://efa.nmichael.de/download/efa230.zip && unzip -o efa.zip && rm efa.zip

popd


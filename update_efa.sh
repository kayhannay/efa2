#!/usr/bin/env bash

pushd content/usr/lib/efa2

wget -q -O efa.zip http://efa.nmichael.de/download/efa232.zip && unzip -o efa.zip && rm efa.zip
wget -q -O program/plugins/javax.mail.jar https://github.com/javaee/javamail/releases/download/JAVAMAIL-1_6_2/javax.mail.jar

popd

echo "Don't forget to update the VERSION file!"


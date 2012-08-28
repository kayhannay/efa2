#!/bin/bash
#
#
VERSION=1.8.3.19

rm -r efa-$VERSION
mkdir efa-$VERSION
#cp -a content/* efa-$VERSION
cp -a debian efa-$VERSION
cd content
tar czf ../efa_$VERSION.orig.tar.gz *
cd ..
cd efa-$VERSION
debuild -uc -us
cd ..


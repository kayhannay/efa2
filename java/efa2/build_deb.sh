#!/bin/bash
#
#
VERSION=2.0.7.18

rm -r efa2-*
mkdir efa2-$VERSION
#cp -a content/* efa-$VERSION
cp -a debian efa2-$VERSION
cd content
tar czf ../efa2_$VERSION.orig.tar.gz *
cd ..
cd efa2-$VERSION
debuild -uc -us
cd ..


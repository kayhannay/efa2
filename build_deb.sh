#!/bin/bash
#
#
VERSION=2.2.2.54
CREATE_RELEASE=true

if [ -f release_info.sh ]; then
    source release_info.sh
fi

if [ "${CREATE_RELEASE}" != "true" ]; then
    echo "Skip build since there is no new release"
    exit 0
fi

rm -r efa2-*
mkdir efa2-$VERSION
cp -a content/* efa-$VERSION
cp -a debian efa2-$VERSION
cd content
tar czf ../efa2_$VERSION.orig.tar.gz *
cd ..
cd efa2-$VERSION
debuild -uc -us
cd ..


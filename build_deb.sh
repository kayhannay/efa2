#!/bin/bash
#
#
VERSION="2.4.0.00-1"
CREATE_RELEASE=true

if [ -f release_info.sh ]; then
    source release_info.sh
fi

if [ "${CREATE_RELEASE}" != "true" ]; then
    echo "Skip build since there is no new release"
    exit 0
fi

ORIG_VERSION=$(echo ${VERSION} | cut -d'-' -f1)

rm -r efa2-*
rm -r efa2_*
mkdir efa2-$ORIG_VERSION
#cp -a content/* efa2-$ORIG_VERSION
cp -a debian efa2-$ORIG_VERSION
cd content
tar czf ../efa2_$ORIG_VERSION.orig.tar.gz *
cd ..

cd efa2-$ORIG_VERSION
debuild -uc -us
cd ..


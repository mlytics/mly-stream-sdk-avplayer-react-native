#!/bin/bash

pod cache clean --all

yarn cache clean

rm -rf ~/Library/Developer/Xcode/DerivedData/*

rm -rf ios/Pods ios/Podfile.lock

cd ios/

pod deintegrate  

pod install

cd ..
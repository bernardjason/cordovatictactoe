# cordovatictactoe

Not needed as you'd clone but this is what I did
cordova create tictactoe bjason.tictactoe

cd tictactoe

After clone do

```
cordova platform add browser --save

cordova platform add android --save

cordova plugin add cordova-plugin-camera

cordova plugin add  cordova-plugin-dialogs

cordova plugin add cordova-plugin-splashscreen

cordova plugin add cordova-plugin-backbutton

cordova plugin save

cordova platform save
```

then to run locally 

```cordova serve browser```
or to deploy to android
```cordova run android```

to get the splash screen and logo into android build run
```./copy.sh```
I cannot get cordova to comfigure this and pick up the files using config.xml

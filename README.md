##### This is a React Native application that uses the MlyPlayer component to play video streams from Mlytics.

## Installation

React Native Setting up the development environment：`https://reactnative.dev/docs/environment-setup`

To install and run this application, follow these steps:

1. Clone `git clone "https://github.com/mlytics/mly-stream-sdk-avplayer-react-native.git"` the repository to your local machine.
2. Install the necessary dependencies by running `npm install` in the project directory.
3. Run the application using 
```js
cd mly-stream-sdk-avplayer-react-native
yarn ios
# OR
yarn react-native run-ios
```

## Usage

Once the application is running, you can use the following buttons to control the video playback:

- Initialize: Initializes the Mlytics driver with the provided credentials.
- Play: Plays the video stream. 

You can also use the `MlyPlayer` component to play video streams in your own application. The component takes the following props:

- src: The URL of the video stream to play.
- controls: Whether or not to show the playback controls.
- muted: Whether or not to mute the video.
- autoplay: Whether or not to start playing the video automatically. 

## Example

```js
import MlyPlayer from './MlyPlayer.js';

const result = NativeModules.MLYDriver.initialize('cegh8d9j11u91ba1u600');

    <MlyPlayer  
        src={'https://vsp-stream.s3.ap-northeast-1.amazonaws.com/HLS/raw/SpaceX.m3u8'} 
        controls={true} 
        muted={false}
        autoplay={true}
        style={
                { 
                width: 200, 
                height: 100
                }
        }
    />

```
  

# IOS Instructions

## Import

### Cocoapods

```bash
pod 'MLYSDK' 
```

or

```bash
pod 'MLYSDK',:git => 'https://github.com/mlytics/mly-stream-sdk-avplayer.git'
```

Add the following code inside the `target ·your_demo' do` block in the Podfile file.

```ruby
installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '14.0'
      config.build_settings['SWIFT_VERSION'] = '5.0'
    end
end
```

Add the following code in the outermost block of the Podfile file.

```ruby
static_frameworks = ['MLYSDK','YogaKit','Yoga']
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_frameworks.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
```

Use `pod install` or `pod update` to install the dependencies.


 
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView, 
  useColorScheme,
  View,
  Button,
  Dimensions,
  NativeModules,
  requireNativeComponent,
} from 'react-native';

import {
  Colors,  
  Header, 
} from 'react-native/Libraries/NewAppScreen';

import MlyPlayer from './MlyPlayer.js';
  
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const window = Dimensions.get("window");
  const width = window.width;
  const height = width * 12 / 16 + 1;

  var autoplay = true;
  var muted = false;
  var controls = false;

  const url = 'https://vsp-stream.s3.ap-northeast-1.amazonaws.com/HLS/raw/SpaceX.m3u8'
  const result = NativeModules.MLYDriver.initialize('cegh8d9j11u91ba1u600');
  console.log('MLYSDK initialize result:', result);

  const player = NativeModules.MLYPlayer;
  
  const restart = () => {
    player.playWith(url)
  }
  const resume = () => {
    player.play()
  }
  const stop = () => {
    player.stop()
  }
  const pause = () => {
    player.pause()
  }
  const changeAutoplay = () => {
    autoplay = !autoplay
    player.changeAutoplay(autoplay)
  }
  const changeMuted = () => { 
    muted = !muted
    player.changeMuted(muted)
  }
  const changeControls = () => {
    controls = !controls
    player.changeControls(controls)
  }

  return (
    <SafeAreaView>  
        <ScrollView style={backgroundStyle} >  
          <Header/>
          

          <View style={{flexDirection:'row'}}>
            <Button title="Pause" onPress={pause} />      
            <Button title="Resume" onPress={resume} />            
            <Button title="Stop" onPress={stop} />
            <Button title="Restart" onPress={restart} />
          </View>

          <View style={{flexDirection:'row'}}>
            <Button title="AutoPlay" onPress={changeAutoplay} /> 
            <Button title="Muted" onPress={changeMuted} /> 
            <Button title="Controls" onPress={changeControls} /> 
          </View> 
          <MlyPlayer  
              src={url} 
              autoplay={autoplay}
              muted={muted}
              controls={controls} 
              style={
                      { 
                        width, 
                        height, 
                        backgroundColor: 'black' 
                      }
                }
            />
          

        </ScrollView> 
         
    </SafeAreaView>
  ); 
} 
export default App;   
import React from 'react';
import type {PropsWithChildren} from 'react';
import { useState } from 'react';
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

  const [playerWidth, setPlayerWidth] = useState(0);
  const [playerHeight, setPlayerHeight] = useState(0);

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    const aspectRatio = 16 / 9; 
    const newWidth = Math.min(width, height * aspectRatio);
    const newHeight = newWidth / aspectRatio;
    setPlayerWidth(newWidth);
    setPlayerHeight(newHeight);
  };
 
  var autoplay = true;
  var muted = false;
  var controls = true;

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
          <View style={{ aspectRatio: 16 / 9 }} onLayout={handleLayout}>
              <MlyPlayer  
                src={url} 
                autoplay={autoplay}
                muted={muted}
                controls={controls} 
                style={{ 
                  width: playerWidth, 
                  height: playerHeight,
                  backgroundColor: 'black' 
                }}
              />
          </View>
        </ScrollView> 
         
    </SafeAreaView>
  ); 
} 
export default App;   
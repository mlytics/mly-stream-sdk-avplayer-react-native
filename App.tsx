import React, { useState } from 'react'; 
import type { PropsWithChildren } from 'react';
import MlyPlayer from './MlyPlayer.js';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  requireNativeComponent,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {

  const initDriver = () => {
    NativeModules.MlyDriver.init({ clientId: 'chqna30cbuhifua4i370', server: 'vsp.mlytics.com', debug: true })
  }

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

  let abr = 'https://p2sp-pull-ali.rcaiwangluo868.com/live/1b3accf14e79412f9bb1ae663a75ed72.m3u8?auth_key=1691212125-a79f1311762c4b19b1ae5f8499b4b251-0-440cc164ec89b785afe7cc55d8ceaa8e'

  const [src, setSrc] = useState(abr);

  const [autoplay, setAutoplay] = useState(false); 

  const changeSrc = () => {
    if (src == abr) {
      setSrc('https://lowlatencydemo.mlytics.co/app/stream/llhls.m3u8')
    } else {
      setSrc(abr)
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
        <View style={{ aspectRatio: 16 / 9 }} onLayout={handleLayout}>
              <MlyPlayer
                    src={src}
                    controls={true}
                    muted={false}
                    isLoaderAllowed={true}
                    isMonitorAllowed={true}
                    autoplay={autoplay}
                    style={{
                      width: playerWidth, 
                      height: playerHeight,
                      backgroundColor: 'black' 
                    }}
                />
        </View>

          <Section title="Initialize Driver" >

            <Button
              onPress={initDriver}
              title="Initialize"
              color="#841584"
            />

          </Section>
          <Section title="Play / Pause">

            <Button
              onPress={() => setAutoplay(!autoplay)}
              title={ autoplay ? 'Pause' : 'Play'}
              color="#841584"
            />
            
          </Section>
          <Section title="Change Video">
 
            <Button
              onPress={changeSrc}
              title="change"
              color="#841584"
            />
            {src}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

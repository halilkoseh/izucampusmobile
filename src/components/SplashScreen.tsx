import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

type SplashScreenProps = {
  onFinish: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const videoRef = useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/iossplash.mp4')} // Video dosyanı buraya ekle
        style={styles.video}
        resizeMode="cover"
        muted={true} // Sessiz başlat
        repeat={false} // Tekrar etmesin
        onEnd={onFinish} // Video bitince uygulamayı başlat
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Siyah arka plan
  },
  video: {
    width: width,
    height: height,
  },
});

export default SplashScreen;

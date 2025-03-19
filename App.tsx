import React, { useRef, useState, useEffect } from 'react';
import { BackHandler, StatusBar, StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker'; // Orientation modülünü ekleyin

const DEFAULT_URL = 'https://izucampus.social/';

const App: React.FC = () => {
  const webViewRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(DEFAULT_URL);

  useEffect(() => {
    SplashScreen.hide();
    Orientation.lockToPortrait(); // Ekranı dikey moda kilitle

    const loadLastVisitedUrl = async () => {
      try {
        const savedUrl = await AsyncStorage.getItem('lastVisitedUrl');
        if (savedUrl) {
          setCurrentUrl(savedUrl);
        }
      } catch (error) {
        console.error('Error loading last visited URL:', error);
      }
    };

    loadLastVisitedUrl();

    const backAction = () => {
      if (canGoBack) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
      Orientation.unlockAllOrientations(); // Uygulama kapandığında kilidi kaldır (isteğe bağlı)
    };
  }, [canGoBack]);

  const handleNavigationChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCurrentUrl(navState.url);
    AsyncStorage.setItem('lastVisitedUrl', navState.url);
  };

  const onRefresh = () => {
    setRefreshing(true);
    webViewRef.current?.reload();
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" translucent={false} backgroundColor="#E9ECEF" />
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <WebView
            ref={webViewRef}
            source={{ uri: currentUrl }}
            onNavigationStateChange={handleNavigationChange}
            allowsBackForwardNavigationGestures={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            mediaPlaybackRequiresUserAction={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
  },
});

export default App;
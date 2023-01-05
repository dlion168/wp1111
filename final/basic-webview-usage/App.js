import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'http://10.5.3.179:19006' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

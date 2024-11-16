import { AppRegistry } from 'react-native';
import App from './App'; // Your main App component
import { name as appName } from '../App.json';

// Import the necessary libraries for web support
import { Platform } from 'react-native';
import * as ReactNativeWeb from 'react-native-web';

// Register the app for the native platforms
AppRegistry.registerComponent(appName, () => App);

// This registers the app to work on the web as well
if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('app-root'),
  });
}

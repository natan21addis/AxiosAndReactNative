// src/index.web.js
import { AppRegistry } from 'react-native';
import App from './App';  // Main app component
import appConfig from './App.json';  // Import the entire JSON file as the default export

// Register the app for web
AppRegistry.registerComponent(appConfig.name, () => App);
AppRegistry.runApplication(appConfig.name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});

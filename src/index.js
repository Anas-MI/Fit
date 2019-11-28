import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store';
import Routes from './config/routes';
import colors from './config/colors';
import {name as appName} from '../app.json';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={colors.defaultColor}
            barStyle="light-content"
          />
          <Routes />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.defaultColor,
  },
});

AppRegistry.registerComponent(appName, () => App);

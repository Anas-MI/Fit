import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {AsyncStorage, View, Image} from 'react-native';
import styles from './style';
import constants from '../../config/constants';
import {NavigationActions, StackActions} from 'react-navigation';

class SplashScreen extends React.Component {
  state = {
    isConnected: true,
  };

  componentWillMount = () => {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setConnected(isConnected);
    });

    AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then(value => {
      if (value !== null && value.length > 1) {
        setTimeout(this.goToMain, 4000);
      } else {
        setTimeout(this.goToLogin, 4000);
      }
    });
  };

  goToMain = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Main'})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  //set connected state
  setConnected = isConnected => {
    this.setState({isConnected});
  };

  //handle connectivity change
  _handleConnectivityChange = isConnected => {
    if (!isConnected) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Connection'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
    this.setState({
      isConnected,
    });
  };

  render() {
    return (
      <View style={{width: '100%', height: '100%', flex: 1}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: 'black',
            justifyContent: 'center',
          }}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo-white-square.png')}
          />
          <Image
            style={styles.cover}
            source={require('../../assets/images/cover.jpg')}
          />
        </View>
      </View>
    );
  }
}

export default SplashScreen;

import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Text, View, Image, BackHandler} from 'react-native';

import Spinner from 'react-native-spinkit';
import colors from '../../config/colors';
import constants from '../../config/constants';
import {NavigationActions, StackActions} from 'react-navigation';
import styles from './style';

class ConnectionScreen extends React.Component {
  state = {
    realm: null,
    isConnected: true,
  };

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setConnected(isConnected);
    });
  };

  setConnected = isConnected => {
    this.setState({isConnected});
  };

  _handleConnectivityChange = isConnected => {
    if (isConnected) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Splash'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
    this.setState({
      isConnected,
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }

  handleBackButton() {
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginForm}>
          <Image
            style={styles.icon}
            source={require('../../assets/images/cloud.png')}
          />
          <Text style={styles.text}>
            Internet connection seems to be down, please check your connection
          </Text>
        </View>
      </View>
    );
  }
}

export default ConnectionScreen;

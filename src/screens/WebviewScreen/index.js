import React from 'react';
import {WebView} from 'react-native-webview';
import {ActivityIndicator, View} from 'react-native';
import styles from './style';
import Header from '../../components/Header';

class WebviewScreen extends React.Component {
  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          screenName={'Video vault'}
          backIcon={true}
          navigator={this.props.navigation}
        />
        <WebView
          source={{uri: 'http://www.fitforgolfusa.com/video-vault'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={this.ActivityIndicatorLoadingView}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

export default WebviewScreen;

import React from 'react';
import {ActivityIndicator, View, PermissionsAndroid} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './style';
import Header from '../../components/Header';
import RNFetchBlob from 'rn-fetch-blob';

async function requestExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return new Promise((resolve, reject) => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

class EbookViewScreen extends React.Component {
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

  componentDidMount() {
    requestExternalStoragePermission().then(res => {
      this.downloadEbook();
    });
  }

  downloadEbook = () => {
    let dirs = RNFetchBlob.fs.dirs;
    const date = new Date();
    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          dirs.DownloadDir +
          '/E-Book-SynergisticGolf-' +
          Math.floor(
            date.getHours() + '' + date.getSeconds() + '' + date.getMinutes(),
          ) +
          '.pdf',
        mime: 'application/pdf',
        description: 'File downloaded by download manager.',
      },
    })
      .fetch(
        'GET',
        'https://www.dropbox.com/sh/cipvoewtwcnzb3t/AAArXtEE_Z2uxEwmI4dLCK9Ra/SYNERGISTIC%20GOLF%20PAGES.pdf?dl=1',
      )
      .then(resp => {
        console.log('resp', resp, resp.base64());
        this.actionPress();
      });
  };

  actionPress = () => {
    this.props.navigation.navigate('Workout');
  };

  render() {
    const {navigation} = this.props;
    const url = navigation.getParam('url');
    return (
      <View style={styles.container}>
        <Header
          screenName={'Ebook'}
          backIcon={true}
          missPrevScreen={true}
          NavigationActions={this.actionPress}
          navigator={this.props.navigation}
        />
        <WebView
          source={{
            uri:
              'https://www.dropbox.com/sh/cipvoewtwcnzb3t/AAA5tBt-oxJv77fr-Qc_g-Xla?dl=0&preview=SYNERGISTIC+GOLF+PAGES.pdf',
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={this.ActivityIndicatorLoadingView}
          startInLoadingState={true}
          mixedContentMode="always"
        />
      </View>
    );
  }
}

export default EbookViewScreen;

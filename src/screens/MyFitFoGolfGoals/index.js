import {
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import Header from '../../components/Header';
import constants from '../../config/constants';
import * as _ from '../../components/MyFitGoals';
import {getFitGoals} from '../../actions/getFitGoals';

class MyFitForGolfGoals extends Component {
  static defaultProps = {myFitGoals: []};

  state = {selection: '', playVideoWithUrl: null, viewFile: null};

  constructor(props) {
    super(props);
    this.keys = [];
    this.values = [];
  }

  componentDidMount() {
    AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then(token => {
      if (token) {
        this.props.getFitGoals(token);
      }
    });
  }

  onViewFile = viewFile => {
    this.setState({viewFile});
  };

  displayContents = (key, index) => {
    const {myFitGoals} = this.props;
    const uri =
      constants.API_BASE_URL.replace('/api', '') +
      myFitGoals[key].replace('/', '');
    if (
      uri.toLowerCase().endsWith('.jpg') ||
      uri.toLowerCase().endsWith('.png') ||
      uri.toLowerCase().endsWith('.gif') ||
      uri.toLowerCase().endsWith('.jpeg')
    ) {
      return (
        <_.ImageBox
          uri={uri}
          key={index}
          title={key}
          onPress={() => this.onViewFile(uri)}
        />
      );
    }

    if (uri.toLowerCase().endsWith('.mp4')) {
      return (
        <_.ImageBox
          key={index}
          title={key}
          placeholder="video-vintage"
          onPress={() => this.setState({playVideoWithUrl: uri})}
        />
      );
    }
    if (uri.toLowerCase().endsWith('.pdf')) {
      return (
        <_.ImageBox
          key={index}
          title={key}
          placeholder="file-pdf-box"
          onPress={() => this.onViewFile(uri)}
        />
      );
    }
  };

  render() {
    const {myFitGoals} = this.props;
    const {playVideoWithUrl, viewFile} = this.state;

    return (
      <View style={styles.container}>
        <Header
          backIcon={true}
          navigator={this.props.navigation}
          screenName={'My Fit For Golf Goals'}
        />
        <View style={styles.inner_view}>
          {myFitGoals ? (
            <ScrollView style={styles.scroll_view}>
              {Object.keys(myFitGoals).map((key, i) => {
                return this.displayContents(key, i);
              })}
            </ScrollView>
          ) : (
            <ActivityIndicator
              size="large"
              color="#009688"
              style={styles.activity_indicator}
            />
          )}
        </View>
        <_.VideoPlayer
          uri={playVideoWithUrl}
          visible={Boolean(playVideoWithUrl)}
          onClose={() => this.setState({playVideoWithUrl: null})}
        />
        <_.FileViewer
          link={viewFile}
          onPressClose={() => this.setState({viewFile: null})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  inner_view: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  scroll_view: {
    flex: 1,
    backgroundColor: '#eee',
  },
  button_group: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-around',
  },
  buttons: {
    marginTop: 0,
    width: 'auto',
    borderRadius: 20,
  },
  activity_indicator: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    myFitGoals: state.fitGoals,
  };
};

export default connect(
  mapStateToProps,
  {getFitGoals},
)(MyFitForGolfGoals);

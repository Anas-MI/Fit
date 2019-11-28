import React from 'react';
import {WebView} from 'react-native-webview';
import {BackHandler, ActivityIndicator, View} from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import {connect} from 'react-redux';
import {getWorkouts, validateWorkout} from '../../actions/workout';

class WorkoutViewScreen extends React.Component {
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

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    const {navigation} = this.props;
    const url = navigation.getParam('url');
    if (url == null) {
      this.actionPress();
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.actionPress();
    return true;
  };

  actionPress = () => {
    this.props.getWorkouts();
    this.props.navigation.navigate('Workout');
  };

  render() {
    const {navigation} = this.props;
    const url = navigation.getParam('url');
    return (
      <View style={styles.container}>
        <Header
          screenName={'Workout video'}
          backIcon={true}
          missPrevScreen={true}
          NavigationActions={this.actionPress}
          navigator={this.props.navigation}
        />
        <WebView
          source={{uri: url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={this.ActivityIndicatorLoadingView}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    workouts: state.workout.data,
  };
};

export default connect(
  mapStateToProps,
  {getWorkouts, validateWorkout},
)(WorkoutViewScreen);

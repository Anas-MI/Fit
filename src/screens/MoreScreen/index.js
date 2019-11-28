import React from 'react';
import {
  ScrollView,
  Alert,
  AsyncStorage,
  View,
  Image,
  Share,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import styles from './style';
import colors from '../../config/colors';
import constants from '../../config/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from '../../config/settings';
import Header from '../../components/Header';
import MoreItem from '../../components/MoreItem';
import {NavigationActions, StackActions} from 'react-navigation';

class MoreScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'More',
    tabBarIcon: ({tintColor}) => (
      <Icon name={'navicon'} size={Settings.tabBatIconSize} color={tintColor} />
    ),
  };

  // go to about us screen
  goToAboutus = () => {
    this.props.navigation.navigate('AboutUs');
  };

  // go to FAQ's screen
  goToHiw = () => {
    this.props.navigation.navigate('HIW');
  };

  // go to FAQ's screen
  goToLogin = () => {
    let keys = [
      constants.ACCESSTOKEN_NAME,
      constants.USER_CREATED_AT,
      constants.EMAIL_NOTIFICATIONS,
      constants.PUSH_NOTIFICATIONS,
    ];
    AsyncStorage.multiRemove(keys, err => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
      });
      this.props.navigation.dispatch(resetAction);
    });
  };

  //on logout
  onLogoutPressed = () => {
    Alert.alert(
      'Logout',
      'Are you sure to logout from the Application?',
      [{text: 'Cancel'}, {text: 'OK', onPress: () => this.goToLogin()}],
      {cancelable: false},
    );
  };

  //share app link
  goToShare = () => {
    Share.share({
      message:
        'http://play.google.com/store/apps/details?id=com.synergisticgolf',
      title: 'Synergistic Golf',
    });
  };

  // go to video vault
  onVaultPressed = () => {
    this.props.navigation.navigate('Webview');
  };

  //go to settings
  goToSettings = () => {
    this.props.navigation.navigate('Settings');
  };

  //go to settings
  goToWorkout = () => {
    this.props.navigation.navigate('Workout');
  };

  //go to favourites
  goToFavourite = () => {
    this.props.navigation.navigate('Favourite');
  };

  //go to My Fit For Goals
  onMyFitFoGolfGoalsPressed = () => {
    this.props.navigation.navigate('MyFitFoGolfGoals');
  };

  // on link press
  onLinkPress = url => {
    let path = 'http://' + url;
    Linking.openURL(path);
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header screenName={'More'} />
        <ScrollView>
          <MoreItem
            title={'How it works'}
            onPressed={this.goToHiw}
            isClickable={true}
          />
          <MoreItem
            title={'Share this App'}
            onPressed={this.goToShare}
            isClickable={true}
          />
          <MoreItem
            title={'My favorites'}
            onPressed={this.goToFavourite}
            isClickable={true}
          />
          <MoreItem
            title={'Workout'}
            onPressed={this.goToWorkout}
            isClickable={true}
          />
          <MoreItem
            title={'Notification settings'}
            onPressed={this.goToSettings}
            isClickable={true}
          />
          <MoreItem
            title={'About us'}
            onPressed={this.goToAboutus}
            isClickable={true}
          />
          <MoreItem
            title={'Video vault'}
            onPressed={this.onVaultPressed}
            isClickable={true}
          />
          <MoreItem
            title={'My Fit For Golf Goals'}
            onPressed={this.onMyFitFoGolfGoalsPressed}
            isClickable={true}
          />
          <MoreItem
            title={'Logout'}
            onPressed={this.onLogoutPressed}
            isClickable={true}
          />
          <View style={{marginVertical: 10, width: '100%'}}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo-white-square.png')}
            />
            <Image
              style={styles.cover}
              source={require('../../assets/images/cover.jpg')}
            />
          </View>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => this.onLinkPress('www.fitforgolfusa.com')}>
            <Text style={styles.text}>www.fitforgolfusa.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => this.onLinkPress('info@fitforgolfusa.com')}>
            <Text style={[styles.text, {marginVertical: 8, marginBottom: 20}]}>
              info@fitforgolfusa.com
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default MoreScreen;

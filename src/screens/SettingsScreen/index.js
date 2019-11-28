import React from 'react';
import { ActivityIndicator, AsyncStorage, Linking, View, Image, Text, Switch, } from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import colors from '../../config/colors';
import constants from '../../config/constants';
import { connect } from 'react-redux';
import { settings } from '../../actions/settings';
import Snackbar from 'react-native-snackbar';

var accessToken;
var emailFlag = 0;
var pushFlag = 0;
class SettingsScreen extends React.Component{

  state = {
    emailNotification: false,
    phoneNotification: false,
    isLoading: false,
  }

  componentWillMount = () => {
   AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then((value) => {
     accessToken = value;
   });
   AsyncStorage.getItem(constants.EMAIL_NOTIFICATIONS).then((value) => {
     if (value === 'true') {
       this.setState({emailNotification: true});
     } else {
       this.setState({emailNotification: false});
     }
   });
   AsyncStorage.getItem(constants.PUSH_NOTIFICATIONS).then((value) => {
     if (value === 'true') {
       this.setState({phoneNotification: true});
     } else {
       this.setState({phoneNotification: false});
     }
   });
 }

//email notification
  notificationEmail = (val) => {
    if (val) {
      emailFlag = 1;
      this.setState({emailNotification: true, isLoading: true});
      AsyncStorage.setItem(constants.EMAIL_NOTIFICATIONS, val+'');
    } else {
      emailFlag = 0;
      this.setState({emailNotification: false, isLoading: true});
      AsyncStorage.setItem(constants.EMAIL_NOTIFICATIONS, val+'');
    }
    const setting = {
      accessToken: accessToken,
      isEmailNotification: emailFlag,
      isPushNotification: pushFlag,
    }
    this.props.settings(setting);
  }

//phone push notofications
  notificationPhone = (val) => {
    if (val) {
      pushFlag = 1;
      this.setState({phoneNotification: true, isLoading: true});
      AsyncStorage.setItem(constants.PUSH_NOTIFICATIONS, val+'');
    } else {
      pushFlag = 0;
      this.setState({phoneNotification: false, isLoading: true});
      AsyncStorage.setItem(constants.PUSH_NOTIFICATIONS, val+'');
    }
    const setting = {
      accessToken: accessToken,
      isEmailNotification: emailFlag,
      isPushNotification: pushFlag,
    }
    this.props.settings(setting);
  }

  componentWillReceiveProps(nextProps){
   if (nextProps.notification.success) {
     Snackbar.show({
         title: "Notification settings changed succesfully",
         duration: Snackbar.LENGTH_SHORT,
     });
   }
   this.setState({isLoading: false});
 }

  render() {
    return(
      <View style={styles.container}>
        <Header screenName={"Notification settings"} backIcon={true} navigator={this.props.navigation}/>
        <View style={styles.innerView}>
          <View style={{width: "100%", flexDirection: 'row',borderBottomWidth: 0.5, marginBottom: 10}}>
            <Text style={{margin: 10, width: '80%', color: colors.defaultColor, fontSize: 15}}>Email notifications </Text>
            <Switch
              value={this.state.emailNotification}
              onValueChange={(val) => this.notificationEmail(val)}
              disabled={false}
              activeText={'On'}
              inActiveText={'Off'}
              backgroundActive={colors.defaultColor}
              backgroundInactive={'gray'}
              circleActiveColor={colors.defaultColor}
              circleInActiveColor={'#000000'}
            />
          </View>
          <View style={{width: "100%", flexDirection: 'row',borderBottomWidth: 0.5, marginBottom: 10}}>
            <Text style={{margin: 10, width: '80%', color: colors.defaultColor, fontSize: 15}}>Push notifications </Text>
            <Switch
              value={this.state.phoneNotification}
              onValueChange={(val) => this.notificationPhone(val)}
              disabled={false}
              activeText={'On'}
              inActiveText={'Off'}
              backgroundActive={colors.defaultColor}
              backgroundInactive={'gray'}
              circleActiveColor={colors.defaultColor}
              circleInActiveColor={'#000000'}
            />
          </View>
        </View>
        {this.state.isLoading &&
          <View style={{
              elevation: 5,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ActivityIndicator animating size="large" />
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    notification: state.settings,
  };
}

export default connect (mapStateToProps,{settings})(SettingsScreen);

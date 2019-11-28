import React from 'react';
import {
  AsyncStorage,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import colors from '../../config/colors';
import settings from '../../config/settings';
import constants from '../../config/constants';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/login';
import CustomButton from '../../components/CustomButton';
import Spinner from 'react-native-spinkit';
import {NavigationActions, StackActions} from 'react-navigation';
import firebase from 'react-native-firebase';

var fcmToken;

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }

  state = {
    username: '',
    password: '',
    isLoading: false,
    keyBoardState: false,
    show: false,
  };

  componentDidMount() {
    firebase
      .messaging()
      .requestPermission()
      .then(() => console.warn('granted'))
      .catch(() => console.warn('notification permission'));
    firebase
      .messaging()
      .getToken()
      .then(token => {
        fcmToken = token;
      });
  }

  //seting username in setState
  setUsername = text => {
    this.setState({username: text});
  };

  //seting password in setState
  setPassword = text => {
    this.setState({password: text});
  };

  // used to focus on next textinput field
  focusNextField = id => {
    this.inputs[id].focus();
  };

  //go to signup
  goToSignup = () => {
    this.props.navigation.navigate('Signup');
  };

  //go to forgot password screen
  goToForgot = () => {
    this.props.navigation.navigate('Forgot');
  };

  //on login on Login Pressed
  onLoginPressed = () => {
    Keyboard.dismiss(); //dismissing keyboard
    const user = {
      username: this.state.username,
      password: this.state.password,
      fcm: fcmToken ? fcmToken : '',
    };
    //validations for username and password
    if (this.state.username.trim().length <= 0) {
      Snackbar.show({
        title: constants.EMPTY_EMAIL,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (this.state.password.trim().length <= 0) {
      Snackbar.show({
        title: constants.EMPTY_PASS,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.setState({isLoading: true});
      this.props.loginUser(user);
    }
  };

  //component will recieve props where we get response from redux and api
  componentWillReceiveProps(nextProps) {
    this.setState({isLoading: false});
    if (nextProps.user.success) {
      AsyncStorage.setItem(
        constants.ACCESSTOKEN_NAME,
        nextProps.user.response.access_token,
      );
      AsyncStorage.setItem(
        constants.EMAIL_NOTIFICATIONS,
        nextProps.user.response.is_email_notification + '',
      );
      AsyncStorage.setItem(
        constants.PUSH_NOTIFICATIONS,
        nextProps.user.response.is_push_notification + '',
      );
      AsyncStorage.setItem(
        constants.USER_CREATED_AT,
        nextProps.user.response.created_at,
      );
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Main'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  // on press EyeIcon
  onPressEye = () => {
    this.setState({show: !this.state.show});
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: settings.paddingOfAuthPages,
          }}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo-white-square.png')}
          />
          <Text
            style={{
              width: '100%',
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 0,
              fontSize: 18,
            }}>
            Login
          </Text>
          <TouchableOpacity onPress={this.goToSignup} style={{width: '100%'}}>
            <Text style={styles.signupText}>
              or{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                create an account
              </Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name={'email'} size={18} />
            <TextInput
              keyboardType="email-address"
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="Username/Email"
              style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setUsername(text)}
              onSubmitEditing={() => {
                this.focusNextField('two');
              }}
              returnKeyType={'next'}
              ref={input => {
                this.inputs['one'] = input;
              }}
            />
          </View>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name={'lock'} size={18} />
            <TextInput
              secureTextEntry={this.state.show ? false : true}
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="Password"
              style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setPassword(text)}
              returnKeyType={'done'}
              ref={input => {
                this.inputs['two'] = input;
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 5,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.onPressEye}>
              <EyeIcon
                style={{color: 'black'}}
                name={this.state.show ? 'md-eye-off' : 'md-eye'}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {!this.state.isLoading ? (
            <CustomButton title={'Login'} onPress={this.onLoginPressed} />
          ) : (
            <View
              style={{
                backgroundColor: colors.defaultColor,
                height: 40,
                width: '100%',
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Spinner
                isVisible={this.state.isLoading}
                size={50}
                type="ThreeBounce"
                color={colors.secondaryColor}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.forgotTouch}
            onPress={this.goToForgot}>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.login,
  };
};

export default connect(
  mapStateToProps,
  {loginUser},
)(LoginScreen);

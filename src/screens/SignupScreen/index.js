import React from 'react';
import {
  AsyncStorage,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import colors from '../../config/colors';
import settings from '../../config/settings';
import constants from '../../config/constants';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
import {signupUser} from '../../actions/register';
import Snackbar from 'react-native-snackbar';
import CustomButton from '../../components/CustomButton';
import Spinner from 'react-native-spinkit';
import firebase from 'react-native-firebase';

var fcmToken;

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }

  state = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    country: '',
    userState: '',
    address: '',
    isLoading: false,
    keyBoardState: false,
  };

  componentDidMount() {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        console.log('granted');
        firebase
          .messaging()
          .getToken()
          .then(token => {
            console.log('this is token >>>>>', token);
            fcmToken = token;
          })
          .catch(e => console.log('Could not get token<<<<<<', e));
      })
      .catch(() => console.log('notification permission'));
  }

  // used to focus on next textinput field
  focusNextField = id => {
    this.inputs[id].focus();
  };

  //seting fullname in setState
  setFullname = text => {
    this.setState({fullname: text});
  };

  //seting email in setState
  setEmail = text => {
    this.setState({email: text});
  };

  //seting password in setState
  setPassword = text => {
    this.setState({password: text});
  };

  //seting confirm password in setState
  setConfirmPassword = text => {
    this.setState({confirmPassword: text});
  };

  //seting confirm password in setState
  setPhone = text => {
    this.setState({phone: text});
  };

  //seting confirm password in setState
  setAge = text => {
    this.setState({age: text});
  };

  //seting confirm password in setState
  setAddress = text => {
    this.setState({address: text});
  };

  //setting country in setstate
  setCountry = text => {
    this.setState({country: text});
  };

  //setting state in setstate
  setUserState = text => {
    this.setState({userState: text});
  };

  //go to forgot password screen
  goToForgot = () => {
    this.props.navigation.navigate('Forgot');
  };

  //go back to loginText
  goToLogin = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  // email address validation
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // on signup pressed
  onSignup = () => {
    Keyboard.dismiss(); // dismissing keyboard
    const user = {
      username: this.state.email,
      password: this.state.password,
      fullname: this.state.fullname,
      phone: this.state.phone,
      age: this.state.age,
      address: this.state.address,
      state: this.state.userState,
      country: this.state.country,
      fcm: fcmToken ? fcmToken : '',
    };
    if (this.state.fullname.trim().length === 0) {
      Snackbar.show({
        title: constants.EMPTY_NAME,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (!this.validateEmail(this.state.email)) {
      Snackbar.show({
        title: constants.VALID_EMAIL,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (this.state.password.trim().length === 0) {
      Snackbar.show({
        title: constants.EMPTY_PASS,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (this.state.confirmPassword.trim().length === 0) {
      Snackbar.show({
        title: constants.EMPTY_CONFIRMPASS,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (this.state.password !== this.state.confirmPassword) {
      Snackbar.show({
        title: constants.DIFF_PASS,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (this.state.country.trim().length === 0) {
      Snackbar.show({
        title: 'Country is required',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.setState({isLoading: true});
      this.props.signupUser(user);
    }
  };

  //component will recieve props where we get response from redux and api
  componentWillReceiveProps(nextProps) {
    this.setState({isLoading: false});
    if (nextProps.register.success) {
      AsyncStorage.setItem(
        constants.ACCESSTOKEN_NAME,
        nextProps.register.response.access_token,
      );
      AsyncStorage.setItem(
        constants.EMAIL_NOTIFICATIONS,
        nextProps.register.response.is_email_notification + '',
      );
      AsyncStorage.setItem(
        constants.PUSH_NOTIFICATIONS,
        nextProps.register.response.is_push_notification + '',
      );
      AsyncStorage.setItem(
        constants.USER_CREATED_AT,
        nextProps.register.response.created_at,
      );
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Main'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
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
              textAlign: 'left',
            }}>
            Signup
          </Text>
          <TouchableOpacity onPress={this.goToLogin} style={{width: '100%'}}>
            <Text style={styles.signupText}>
              {'or '}
              <Text style={{textDecorationLine: 'underline'}}>
                already have an account
              </Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name={'person'} size={18} />
            <TextInput
              autoCapitalize="words"
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="Full name"
              style={styles.input}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setFullname(text)}
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
            <Icon style={styles.searchIcon} name={'email'} size={18} />
            <TextInput
              keyboardType="email-address"
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="Email address"
              style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setEmail(text)}
              onSubmitEditing={() => {
                this.focusNextField('three');
              }}
              returnKeyType={'next'}
              ref={input => {
                this.inputs['two'] = input;
              }}
            />
          </View>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name={'lock'} size={18} />
            <TextInput
              secureTextEntry={true}
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="Password"
              style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setPassword(text)}
              onSubmitEditing={() => {
                this.focusNextField('four');
              }}
              returnKeyType={'next'}
              ref={input => {
                this.inputs['three'] = input;
              }}
            />
          </View>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name={'lock'} size={18} />
            <TextInput
              secureTextEntry={true}
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="Confirm Password"
              style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setConfirmPassword(text)}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.focusNextField('five');
              }}
              ref={input => {
                this.inputs['four'] = input;
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.secondaryColor,
                borderWidth: 0.5,
                borderRightWidth: 0,
                borderColor: colors.defaultColor,
                marginVertical: 5,
                width: '70%',
              }}>
              <Icon style={styles.searchIcon} name={'local-phone'} size={18} />
              <TextInput
                keyboardType={'phone-pad'}
                secureTextEntry={false}
                editable={true}
                maxLength={12}
                placeholderTextColor="grey"
                placeholder="Phone number*"
                style={styles.input}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setPhone(text)}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.focusNextField('six');
                }}
                ref={input => {
                  this.inputs['five'] = input;
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.secondaryColor,
                borderWidth: 0.5,
                borderColor: colors.defaultColor,
                marginVertical: 5,
                width: '30%',
              }}>
              <Icon style={styles.searchIcon} name={'cake'} size={18} />
              <TextInput
                keyboardType={'numeric'}
                secureTextEntry={false}
                editable={true}
                maxLength={3}
                placeholderTextColor="grey"
                placeholder="Age*"
                style={styles.input}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setAge(text)}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.focusNextField('seven');
                }}
                ref={input => {
                  this.inputs['six'] = input;
                }}
              />
            </View>
          </View>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name={'location-city'} size={18} />
            <TextInput
              keyboardType="email-address"
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="State*"
              style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setUserState(text)}
              onSubmitEditing={() => {
                this.focusNextField('eight');
              }}
              returnKeyType={'next'}
              ref={input => {
                this.inputs['seven'] = input;
              }}
            />
          </View>
          <View style={styles.searchSection}>
            <FontIcon style={styles.searchIcon} name={'globe'} size={18} />
            <TextInput
              keyboardType="email-address"
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="Country"
              style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setCountry(text)}
              returnKeyType={'next'}
              ref={input => {
                this.inputs['eight'] = input;
              }}
            />
          </View>
          {!this.state.isLoading ? (
            <CustomButton title={'Signup'} onPress={this.onSignup} />
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
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    register: state.signup,
  };
};

export default connect(
  mapStateToProps,
  {signupUser},
)(SignupScreen);

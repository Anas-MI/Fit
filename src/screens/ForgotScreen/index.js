import React from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import colors from '../../config/colors';
import settings from '../../config/settings';
import constants from '../../config/constants';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {forgotPassword} from '../../actions/forgot';
import Snackbar from 'react-native-snackbar';
import CustomButton from '../../components/CustomButton';
import Spinner from 'react-native-spinkit';

class ForgotScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    isLoading: false,
    keyBoardState: false,
  };

  // email address validation
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  //seting email in setState
  setEmail = text => {
    this.setState({email: text});
  };

  //go back to loginText
  goToLogin = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  // on reset pressed
  onReset = () => {
    Keyboard.dismiss(); //dismiss keyboard
    const user = {
      email: this.state.email,
    };
    if (
      this.state.email.trim().length > 0 &&
      this.validateEmail(this.state.email)
    ) {
      this.setState({isLoading: true});
      this.props.forgotPassword(user);
    } else {
      Snackbar.show({
        title: constants.VALID_EMAIL,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  //component will recieve props where we get response from redux and api
  componentWillReceiveProps(nextProps) {
    this.setState({isLoading: false});
    if (nextProps.forgotResponse.success) {
      this.props.navigation.navigate('Login');
      // const resetAction = NavigationActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({routeName: 'Main'})]
      // });
      // this.props.navigation.dispatch(resetAction);
    }
  }

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
          <Text style={styles.signupText}>{constants.FORGOT_MESSAGE}</Text>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name={'email'} size={18} />
            <TextInput
              keyboardType="email-address"
              editable={true}
              maxLength={40}
              placeholderTextColor="grey"
              placeholder="Enter your Email"
              style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setEmail(text)}
              returnKeyType={'done'}
            />
          </View>
          {!this.state.isLoading ? (
            <CustomButton title={'Submit'} onPress={this.onReset} />
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
          <TouchableOpacity onPress={this.goToLogin} style={{width: '100%'}}>
            <Text style={styles.signupText}>{'Back to Login'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    forgotResponse: state.forgot,
  };
};

export default connect(
  mapStateToProps,
  {forgotPassword},
)(ForgotScreen);

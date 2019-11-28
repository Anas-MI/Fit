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
  BackHandler,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import colors from '../../config/colors';
import settings from '../../config/settings';
import constants from '../../config/constants';
import Settings from '../../config/settings';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import {shippingAddress} from '../../actions/book';
import styles from './style';

class ShippingDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }

  state = {
    addressLine1: '',
    addressLine2: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  };

  // used to focus on next textinput field
  focusNextField = id => {
    this.inputs[id].focus();
  };

  //seting address line1 in setState
  setAddressLine1 = text => {
    this.setState({addressLine1: text});
  };

  //seting address line2 in setState
  setAddressLine2 = text => {
    this.setState({addressLine2: text});
  };

  //seting country in setState
  setCountry = text => {
    this.setState({country: text});
  };

  //seting state in setState
  setUserState = text => {
    this.setState({state: text});
  };

  //seting city in setState
  setCity = text => {
    this.setState({city: text});
  };

  //seting Pincode in setState
  setPincode = text => {
    this.setState({pincode: text});
  };

  //on submit pressed
  onSubmitPressed = () => {
    Keyboard.dismiss(); // dismissing keyboard
    const {
      addressLine1,
      addressLine2,
      country,
      state,
      city,
      pincode,
    } = this.state;
    const data = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      country: country,
      state: state,
      city: city,
      pincode: pincode,
    };
    if (addressLine1.trim().length === 0) {
      Snackbar.show({
        title: constants.EMPTY_ADDRESS_LINE1,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (country.trim().length === 0) {
      Snackbar.show({
        title: constants.EMPTY_COUNTRY,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (state.trim().length === 0) {
      Snackbar.show({
        title: constants.EMPTY_STATE,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (city.trim().length === 0) {
      Snackbar.show({
        title: constants.EMPTY_CITY,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (pincode.trim().length === 0) {
      Snackbar.show({
        title: constants.EMPTY_PINCODE,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (pincode.trim().length > 8) {
      Snackbar.show({
        title: constants.VALID_PINCODE,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.setState({isLoading: true});
      AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then(value => {
        data.accessToken = value;
        this.props.shippingAddress(data).then(async res => {
          const dataAsString = await new Response(res._bodyInit).text();
          const obj = JSON.parse(dataAsString);
          if (obj.success) {
            this.props.navigation.navigate('Payment', {
              amount: obj.response.amount,
              shippingId: obj.response.id,
              type: 'ebook',
            });
          } else {
            Snackbar.show({
              title: obj.error.description,
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        });
      });
    }
  };

  render() {
    const {navigation} = this.props;
    const amount = navigation.getParam('amount');
    return (
      <ScrollView style={styles.container}>
        <Header
          screenName={'Shipping Details'}
          navigator={this.props.navigation}
          submitIcon={false}
          backIcon={true}
        />
        <View style={styles.container}>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: settings.paddingOfAuthPages,
              paddingTop: 30,
            }}>
            <Text style={{color: 'grey'}}>
              Please enter shipping details here
            </Text>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name={'address-book'} size={20} />
              <TextInput
                keyboardType="email-address"
                editable={true}
                maxLength={100}
                placeholderTextColor="grey"
                placeholder="Address Line1"
                style={styles.input}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setAddressLine1(text)}
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
              <Icon style={styles.searchIcon} name={'address-book'} size={20} />
              <TextInput
                keyboardType="email-address"
                editable={true}
                maxLength={100}
                placeholderTextColor="grey"
                placeholder="Address Line2"
                style={styles.input}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setAddressLine2(text)}
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
              <Icon style={styles.searchIcon} name={'address-book'} size={20} />
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
              <Icon style={styles.searchIcon} name={'address-book'} size={20} />
              <TextInput
                keyboardType="email-address"
                editable={true}
                maxLength={40}
                placeholderTextColor="grey"
                placeholder="State"
                style={styles.input}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setUserState(text)}
                onSubmitEditing={() => {
                  this.focusNextField('five');
                }}
                returnKeyType={'next'}
                ref={input => {
                  this.inputs['four'] = input;
                }}
              />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name={'address-book'} size={20} />
              <TextInput
                keyboardType="email-address"
                editable={true}
                maxLength={40}
                placeholderTextColor="grey"
                placeholder="City"
                style={styles.input}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setCity(text)}
                onSubmitEditing={() => {
                  this.focusNextField('six');
                }}
                returnKeyType={'next'}
                ref={input => {
                  this.inputs['five'] = input;
                }}
              />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name={'address-book'} size={20} />
              <TextInput
                keyboardType="numeric"
                editable={true}
                maxLength={16}
                placeholderTextColor="grey"
                placeholder=" Zip Code"
                style={styles.input}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setPincode(text)}
                ref={input => {
                  this.inputs['six'] = input;
                }}
              />
            </View>
            {!this.state.isLoading ? (
              <CustomButton title={'Submit'} onPress={this.onSubmitPressed} />
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
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  {shippingAddress},
)(ShippingDetailsScreen);

import React from 'react';
import { Text, TouchableOpacity, View, AsyncStorage, TouchableHighlight, Image, ImageBackground, Modal, TextInput, TouchableWithoutFeedback} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-render-html';
import Snackbar from 'react-native-snackbar';
import CustomButton from '../../components/CustomButton';
import constants from '../../config/constants';
import colors from '../../config/colors';
import Settings from '../../config/settings';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from './style';

class ListItem extends React.PureComponent {
  state = {
    accessToken: '',
  }

  componentWillMount = () => {
    AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then((value) => {
      this.setState({
        accessToken: value
      })
    });
  }

  render() {
    const { item } = this.props;
    let subscribed = false
    if (item.subscriptions.length > 0) {
      item.subscriptions.map((subscription) => {
        if (subscription.user.access_token == this.state.accessToken) {
          subscribed = true;
        }
      })
    }
    return(
      <TouchableOpacity onPress={() => this.props.onVideoPress(item)} >
        <View style={styles.container}>
          <View>
            <ImageBackground style={styles.image} source={{uri: item.thumbnail}} >
              <Icon name={'caret-right'} color='red' size={Settings.caretIcon}/>
            </ ImageBackground>
          </View>
          <View style={styles.rightContainer}>
            <Text  style={styles.heading}>{item.title}</Text>
            <HTML style={styles.subHeading} html={item.description} />
              { item.is_paid == false ?
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Free</Text>
                </View>
                :
                subscribed ?
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Paid</Text>
                </View>
                :
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Pay $3.99</Text>
                </View>
              }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default (ListItem);

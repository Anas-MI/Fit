import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  WebView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import colors from '../../config/colors';
import {connect} from 'react-redux';
import {howItWorks} from '../../actions/howItWorks';
import HTML from 'react-native-render-html';
import constants from '../../config/constants';
import {validateEbook} from '../../actions/book';

class HIWScreen extends React.Component {
  state = {
    data: ' -- ',
  };

  componentWillMount = () => {
    this.props.howItWorks();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.contentIs.success) {
      this.setState({data: nextProps.contentIs.response[0].content});
    }
  }

  //on Buy Booke press
  onBuyPress = () => {
    this.props.navigation.navigate('ShippingDeatils');
  };

  //on Ebook press
  onEbookPress = () => {
    AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then(value => {
      let data = {accessToken: value};
      this.props.validateEbook(data).then(async res => {
        const dataAsString = await new Response(res._bodyInit).text();
        const obj = JSON.parse(dataAsString);
        if (obj.success) {
          this.props.navigation.navigate('Ebook', {
            url: 'http://18.217.138.86/SYNERGISTIC-GOLF.pdf',
          });
        } else {
          this.props.navigation.navigate('Payment', {
            type: 'ebook',
            amount: obj.response.amount,
          });
        }
      });
    });
  };

  render() {
    var htmlCode = '<b>I am rendered in a <i>WebView</i></b>';

    return (
      <ScrollView style={styles.container}>
        <Header
          screenName={'How it works'}
          backIcon={true}
          navigator={this.props.navigation}
        />
        <View style={styles.innerView}>
          <Text style={styles.title}>HOW THIS APP WILL HELP YOU</Text>
          <HTML html={this.state.data} />
        </View>
        <View style={styles.containerContent}>
          <View>
            <Image
              style={styles.image}
              source={require('../../assets/images/synergisticgolfFrontCover.jpg')}
            />
            <Image
              style={styles.image}
              source={require('../../assets/images/synergisticgolfCover.jpg')}
            />
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity
              style={{width: '50%'}}
              onPress={this.onEbookPress}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Ebook</Text>
                <Text style={[styles.buttonText, {marginLeft: 5}]}>$19</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '50%'}} onPress={this.onBuyPress}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Buy Book</Text>
                <Text style={[styles.buttonText, {marginLeft: 5}]}>$29</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    contentIs: state.howItWorks,
  };
};

export default connect(
  mapStateToProps,
  {howItWorks, validateEbook},
)(HIWScreen);

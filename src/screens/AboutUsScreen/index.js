import React from 'react';
import {
  Linking,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import colors from '../../config/colors';
import {connect} from 'react-redux';
import {aboutUs} from '../../actions/aboutUs';
import HTML from 'react-native-render-html';
import {validateEbook} from '../../actions/book';
import constants from '../../config/constants';

class AboutUsScreen extends React.Component {
  state = {
    data: ' -- ',
  };

  componentWillMount = () => {
    this.props.aboutUs();
  };

  openWebsite = () => {
    Linking.openURL('http://www.fitforgolfusa.com');
  };

  openEmail = () => {
    Linking.openURL('mailto:info@fitforgolfusa.com');
  };

  openInsta = () => {
    Linking.openURL('https://www.instagram.com/fitforgolf/');
  };

  openFb = () => {
    Linking.openURL('https://www.facebook.com/fitforgolfusa/');
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
    return (
      <ScrollView style={styles.container}>
        <Header
          screenName={'About us'}
          backIcon={true}
          navigator={this.props.navigation}
        />
        <View style={styles.innerView}>
          <Text style={styles.title}>What is Synergistic Golf?</Text>
          <HTML html={this.state.data} />
          <Text style={[styles.description, {fontWeight: 'bold'}]}>
            For more information, please visit us at:
          </Text>
          <View style={styles.contactview}>
            <Text style={styles.linkText}>Website:</Text>
            <TouchableOpacity onPress={this.openWebsite}>
              <Text style={styles.underLineText}>www.fitforgolfusa.com</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactview}>
            <Text style={styles.linkText}>Email:</Text>
            <TouchableOpacity onPress={this.openEmail}>
              <Text style={styles.underLineText}>info@fitforgolfusa.com</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactview}>
            <Text style={styles.linkText}>Instagram:</Text>
            <TouchableOpacity onPress={this.openInsta}>
              <Text style={styles.underLineText}>
                www.instagram.com/fitforgolf
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactview}>
            <Text style={styles.linkText}>Facebook:</Text>
            <TouchableOpacity onPress={this.openFb}>
              <Text style={styles.underLineText}>
                www.facebook.com/fitforgolfusa
              </Text>
            </TouchableOpacity>
          </View>
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
    contentIs: state.aboutUs,
  };
};

export default connect(
  mapStateToProps,
  {aboutUs, validateEbook},
)(AboutUsScreen);

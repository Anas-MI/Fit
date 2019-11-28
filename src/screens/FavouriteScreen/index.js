import React from 'react';
import { AsyncStorage, View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './style';
import colors from '../../config/colors';
import constants from '../../config/constants';
import Settings from '../../config/settings';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getFavorites } from '../../actions/getFavoriteDates';
import moment from 'moment';

var nextDay = [];
class FavouriteScreen extends React.Component{

  state = {
    minDate: '',
  }

//go to scheduled date
  goToday = (day) => {
    const abc = {
      dateString: day,
    }
    this.props.navigation.navigate('PreviousTask', {day: abc});
  }

  componentWillMount = () => {
    AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then((value) => {
      accessToken = value;
      this.props.getFavorites(value);
    });
  }

  componentWillReceiveProps(nextProps){
    // console.log("at schedule screen",nextProps.favouritesResponse.favoriteDates);
    // nextDay = nextProps.favouritesResponse.favoriteDates;
  }

  render() {
    var nextDay = this.props.favouritesResponse.favoriteDates;
    return(
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header screenName={"My favorites"} navigator={this.props.navigation} submitIcon={false} backIcon={true}/>
        {nextDay.length > 0 ?
          <FlatList
            showsVerticalScrollIndicator={false}
            data={nextDay}
            renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.goToday(item.date)} style={{ backgroundColor: colors.white, marginTop: 5, borderBottomWidth: 0.5, padding: 10, paddingBottom: 3}}>
              <Text style={{color: colors.defaultColor,}}>{item.name}</Text>
              <Text><Text style={{color: colors.defaultColor,}}>Goal : </Text>{item.goal}</Text>
              <Text style={{width: "100%", textAlign: 'right'}}>{moment(item.date).format("MMM Do YY")}</Text>
            </TouchableOpacity>
            }
          />
          :
          <View style={{padding: 30,width: "100%", height: "100%", justifyContent: 'center'}}>
            <Text style={{fontSize: 18,width: "100%", textAlign: 'center'}}>You have no favorite task</Text>
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favouritesResponse: state.favourites,
  };
};

export default connect(mapStateToProps,{getFavorites})(FavouriteScreen);

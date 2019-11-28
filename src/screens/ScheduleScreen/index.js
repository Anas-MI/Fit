import React from 'react';
import { ScrollView, AsyncStorage, View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import styles from './style';
import colors from '../../config/colors';
import constants from '../../config/constants';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import Settings from '../../config/settings';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getFavorites } from '../../actions/getFavoriteDates';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

var currentDate,maxDate,value;
var nextDay = [];
class ScheduleScreen extends React.Component{
  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ tintColor }) => <MaterialIcons name={'calendar'} size={Settings.tabBatIconSize} color={tintColor} />
  };

  state = {
    minDate: '',
  }

//go to scheduled date
  goToday = (dayName,day,state,marking) => {
    console.log("log at time and day selcted is",dayName,day,state,marking);
    if (!state) {
      this.props.navigation.navigate('PreviousTask', {day: day});
    }
  }

  componentWillMount = () => {

    AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then((value) => {
      accessToken = value;
      this.props.getFavorites(value);
    });

    AsyncStorage.getItem(constants.USER_CREATED_AT).then((value) => {
      let min = new Date();
        min.setDate(min.getDate() - 7);
        min =  moment(min).format("YYYY-MM-DD");
      this.setState({minDate: min})
    });

    currentDate  = new Date();
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
  }

//gey days
  getDayComponent = ({date,state,marking}) => {
      // var today1  = moment.unix(value).format("MM/DD/YYYY");new Date(date.timestamp);

      var dayName = moment(date.dateString).format('dddd');
      return (
        <TouchableOpacity style={{width: "10%", alignItems: 'center'}} onPress={() => this.goToday(dayName,date,state,marking)}>
        {dayName !== 'Sunday' && dayName !== 'Saturday' ?
          <Text
            style={{
              fontSize: 14 ,
              textAlign: 'center',
              color: state === 'disabled' ? 'gray' :state === 'today' ? 'green' : 'black',
              fontWeight: state === 'disabled' ? 'normal' :state === 'today' ? 'bold' : 'bold',
              backgroundColor: state !== 'disabled' && marking === 'true'? '#7FCEE9' : 'white',
              borderRadius: 10,
              height: 21,
              width: 21,
            }}>
            {date.day}
          </Text>
          :
          <Text
            style={{
              fontSize: 14 ,
              textAlign: 'center',
              color: state === 'disabled' ? 'gray' :state === 'today' ? 'green' : 'red',
              fontWeight: state === state === 'disabled' ? 'normal' :state === 'today' ? 'bold' : 'bold',
              backgroundColor: state !== 'disabled' && marking === 'true'? '#7FCEE9' : 'white',
              borderRadius: 10,
              height: 21,
              width: 21,
            }}>
            {date.day}
          </Text>
        }
        </TouchableOpacity>
      );
    }

  componentWillReceiveProps(nextProps){
    // console.log("at schedule screen",nextProps.favouritesResponse.favoriteDates);
    // nextDay = nextProps.favouritesResponse.favoriteDates;
  }

  // on link press
  onLinkPress = (url) => {
    let path = 'http://' + url;
    Linking.openURL(path);
  }

  render() {
    var nextDay = this.props.favouritesResponse.favoriteDates;
    let dates = {};
    nextDay.forEach((val) => {
      dates[val.date] = 'true';
    });
    return(
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header screenName={"Schedule"} navigator={this.props.navigation} submitIcon={false}/>
        <ScrollView>
        <View style={{padding: 10}}>
          <Calendar
            markedDates={dates}
            markingType={'period'}
            theme={{
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              textMonthFontWeight: 'bold',
              monthTextColor: 'black',
            }}
            dayComponent={({date,state,marking}) => this.getDayComponent({date, state, marking})}
            // Initially visible month. Default = Date()
            current={currentDate}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={this.state.minDate}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={currentDate}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => this.goToday(day)}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => this.goToday(day)}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMM - yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => (<MaterialIcons name={'chevron-'+direction} size={Settings.tabBatIconSize} color={'black'} />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
          />
        </View>
        <View style={{marginVertical: 10, width: "100%"}}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo-white-square.png')}
          />
          <Image
            style={styles.cover}
            source={require('../../assets/images/cover.jpg')}
          />
        </View>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.onLinkPress('www.fitforgolfusa.com')}>
            <Text style={styles.text}>www.fitforgolfusa.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.onLinkPress('info@fitforgolfusa.com')}>
            <Text style={[styles.text, {marginVertical: 8, marginBottom:20} ]}>info@fitforgolfusa.com</Text>
          </TouchableOpacity>
      </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
    return {
        favouritesResponse: state.favourites,
    };
};

export default connect(mapStateToProps,{getFavorites})(ScheduleScreen);

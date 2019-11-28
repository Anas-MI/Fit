import React from 'react';
import { Platform,ActivityIndicator, AsyncStorage, View, Dimensions, Text, ScrollView, Image, TextInput} from 'react-native';
import styles from './style';
import colors from '../../config/colors';
import constants from '../../config/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from '../../config/settings';
import Header from '../../components/Header';
import moment from 'moment';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CustomButton from '../../components/CustomButton';
import { NavigationActions, StackActions } from 'react-navigation';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import { dateContent } from '../../actions/contentByDate';
import { submit } from '../../actions/submitTest';
import { addFavorite } from '../../actions/addFavorite';
import _ from 'lodash';

var dateIs,dayIs,accessToken;
var favArray = [];
const { width: screenWidth } = Dimensions.get('window');

class PreviousTaskScreen extends React.Component{
  static navigationOptions = {
    tabBarLabel: 'Today\'s Goal',
    tabBarIcon: ({ tintColor }) => <Icon name={'calendar-check-o'} size={Settings.tabBatIconSize} color={tintColor} />
  };

  state = {
    synergistic_id : 0,
    isLoading: false,
    activeSlide: 0,
    entries: [],
    test: false,
    backIcon: false,
    textHeader: '',
    name: '--',
    goal: '--',
    explanation: '--',
    nutrition_tip: '--',
    thoughts: '--',
    thought_by: '--',
    think_golf: '--',
    make_me_smile: '--',
    formData: {},
    journal: [],
    loader: false,
  }

  componentWillMount = () => {
  //getting access tokek from async storage
    AsyncStorage.getItem(constants.ACCESSTOKEN_NAME).then((value) => {
        accessToken = value;
        const data = {
          date: this.props.navigation.state.params.day.dateString,
          accessToken: value,
        }
        console.log("mydatestringis this",this.props.navigation.state.params.day.dateString);
        this.props.dateContent(data);
      });

    dateIs =  moment(this.props.navigation.state.params.day.dateString).format("dddd, MMM Do YY");
    dayIs = moment(this.props.navigation.state.params.day.dateString).format('dddd');
    this.setState({backIcon: true, textHeader: dateIs})
  }

  _renderItem ({item, index}) {
      return <Image style={{backgroundColor: 'white',width: "100%", height: 200, resizeMode: 'contain'}} source={{uri:item.image}} />
  }

  onSubmitPressed = () => {
    this.setState({isLoading: true})
    const data = {
      answer: this.state.formData,
      accessToken: accessToken,
      date: this.props.navigation.state.params.day.dateString,
    }
    this.props.submit(data);
  }

  get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'black'
              }}
              inactiveDotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'black'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

  //component will recieve props where we get response from redux and api
    componentWillReceiveProps(nextProps){
      if (this.state.isLoading) {
        this.setState({isLoading: false})
        this.props.navigation.dispatch(NavigationActions.back());
      }
      const { formData } = this.state;
      if (nextProps.contentIs.success) {
        if (nextProps.contentIs.response) {
          if (dayIs !== 'Sunday' && dayIs !== 'Saturday') {
            this.setState({
              synergistic_id: nextProps.contentIs.response.id,
              loader: true,
              name: nextProps.contentIs.response.name,
              goal: nextProps.contentIs.response.goal,
              explanation: nextProps.contentIs.response.explanation,
              nutrition_tip: nextProps.contentIs.response.nutrition_tip,
              thoughts: nextProps.contentIs.response.thoughts,
              thought_by: nextProps.contentIs.response.thought_by,
              think_golf: nextProps.contentIs.response.think_golf,
              make_me_smile: nextProps.contentIs.response.make_me_smile,
              entries: nextProps.contentIs.response.images,
            })
          } else {
            nextProps.contentIs.response.map((journal) => (
              formData[journal.question] = journal.answer
            ))
            this.setState({
              loader: true,
              journal: nextProps.contentIs.response,
              formData
            })
          }
        }
      }
    }

// on change text input
    onChange = (question,answer) => {
      console.log("at task screen",question,answer);
        const { formData } = this.state;
        formData[question] = answer;
        this.setState({
          formData
        })
    }

  // heart pressed or unpressed
    favoritePress = (state) => {
      const data = {
        date: this.props.navigation.state.params.day.dateString,
        accessToken: accessToken,
        id: this.state.synergistic_id,
        name: this.state.name,
        goal: this.state.goal,
      }
      this.props.addFavorite(data);
    }

  render() {
    let abc =  'favorite-border';
    const { journal, formData, loader } = this.state;
    favArray = this.props.favouritesResponse.favoriteDates;
    const unfavIndex = _.findIndex(favArray, {'date': moment(this.props.navigation.state.params.day.dateString).format("YYYY-MM-DD")});
    if (unfavIndex >= 0) {
      abc =  'favorite';
    } else {
      abc =  'favorite-border';
    }

    return(
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header
          screenName={this.state.textHeader}
          backIcon={this.state.backIcon}
          navigator={this.props.navigation}
          heart={dayIs !== 'Sunday' && dayIs !== 'Saturday' ? true : false}
          iconName={abc}
          favoritePress={(state) => this.favoritePress(state)}
        />
        {dayIs !== 'Sunday' && dayIs !== 'Saturday' ?
          <ScrollView >
            <View>
              <Carousel
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              />
              <View style={{position: 'absolute', bottom: 1, width: "100%"}}>
              {this.pagination}
              </View>
            </View>
            {loader ?
              <View style={{padding: 10, marginBottom: 40}}>
                <Text style={[styles.headingText,{fontSize: 19}]}>
                  {this.state.name}
                </Text>
                <Text style={styles.headingText}>
                  Goal:
                </Text>
                <Text style={styles.textContent}>
                  {this.state.goal}
                </Text>
                <Text style={styles.headingText}>
                  Explanation:
                </Text>
                <Text style={styles.textContent}>
                  {this.state.explanation}
                </Text>
                <Text style={styles.headingText}>
                  Nutrition Tip:
                </Text>
                <Text style={styles.textContent}>
                  {this.state.nutrition_tip}
                </Text>
                <Text style={styles.headingText}>
                  Experience Good Thoughts:
                </Text>
                <Text style={styles.textContent}>
                {this.state.thoughts}
                </Text>
                <Text style={[styles.textContent,{width: "100%", textAlign: 'right'}]}>
                - {this.state.thought_by}
                </Text>
                <Text style={styles.headingText}>
                  Think Golf:
                </Text>
                <Text style={styles.textContent}>
                {this.state.think_golf}
                </Text>
                <Text style={styles.headingText}>
                  Make Me Smile:
                </Text>
                <Text style={styles.textContent}>
                {this.state.make_me_smile}
                </Text>
              </View>
              :
              <View style={{width: "100%", height: 500}}>
                <ActivityIndicator
                  color='#000'
                  size='large'
                  style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                />
              </View>
            }
          </ScrollView>
        :
          <ScrollView style={{padding: 10}} keyboardShouldPersistTaps='always'>
            {loader ?
              <View>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/logo-white-square.png')}
                />
                <Text style={[styles.headingText,{fontSize: 19}]}>
                  Golfing days are good for your health
                </Text>
                <Text style={[styles.headingText,{paddingTop: 10}]}>
                  Reflecting on the past week:
                </Text>
                <Text style={[styles.textContent,{paddingTop: 10}]}>
                  What was your basic attitude? Were you a positive thinker or did you need
                  an “attitude adjustment?” Are you having success with eating healthier and
                  doing your exercise program? How do you feel physically? If you went golfing,
                  write down any comments that might be helpful later in improving your
                  game. Remember, that laughter is the best medicine in the face of adversity.
                  Are you seeing the lighter side of life?
                </Text>
                {
                  journal.length > 0 &&
                  journal.map((journals) => (
                    <View>
                    <Text style={[styles.textContent,{paddingTop: 10, color: colors.defaultColor}]}>
                      {journals.question}
                    </Text>
                    <TextInput style={{color: 'black',padding: 10,borderBottomWidth: 0.5 ,borderBottomColor: colors.defaultColor}}
                      value={formData[journals.question]}
                      onChangeText = {(text) => this.onChange(journals.question, text)}
                      multiline={true}
                    />
                    </View>
                  ))
                }

                {!this.state.isLoading ?
                    <CustomButton title={'Submit'} onPress={this.onSubmitPressed}/>
                    :
                    <View style = {{backgroundColor: colors.defaultColor,
                                    height:40,
                                    width: '100%',
                                    marginTop: 20,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    padding: 10,}}>
                      <Spinner
                        isVisible={this.state.isLoading}
                        size={50}
                        type='ThreeBounce'
                        color={colors.secondaryColor} />
                    </View>
                  }
                <View style={{marginBottom: 40}}/>
                </View>
              :
              <View style={{width: "100%", height: 500}}>
                <ActivityIndicator
                  color='#000'
                  size='large'
                  style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                />
              </View>
            }
          </ScrollView>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        contentIs: state.dateContent,
        test: state.testSubmit,
        favouritesResponse: state.favourites,
    };
};

export default connect(mapStateToProps,{dateContent,submit,addFavorite})(PreviousTaskScreen);


/////////text looping

// {JournalFeed &&
//   <View>
//   <Text style={[styles.textContent,{paddingTop: 10, color: 'black'}]}>
//     My nutritional habits this week were:
//   </Text>
//   <TextInput
//     value={JournalFeed["My nutritional habits this week were:"]}
//     multiline={true}
//   />
//   <Text style={[styles.textContent,{paddingTop: 10, color: 'black'}]}>
//     What made me smile this week?
//   </Text>
//   <TextInput
//     multiline={true}
//   />
//   <Text style={[styles.textContent,{paddingTop: 10, color: 'black'}]}>
//     Looking back at my golf week:
//   </Text>
//   <Text style={[styles.textContent,{paddingTop: 10, color: 'black'}]}>
//     My Score:
//   </Text>
//   <TextInput
//     multiline={true}
//   />
//   <Text style={[styles.textContent,{paddingTop: 10, color: 'black'}]}>
//     What did I do right?
//   </Text>
//   <TextInput
//     multiline={true}
//   />
//   <Text style={[styles.textContent,{paddingTop: 10, color: 'black'}]}>
//     What could I do to improve?
//   </Text>              source={require('../../assets/images/logo-white-square.png')}
//
//   <TextInput
//     multiline={true}
//   />
//   <Text style={[styles.textContent,{paddingTop: 10, color: 'black'}]}>
//     Goals for next week:
//   </Text>
//   <TextInput
//     multiline={true}
//   />
//   </View>
// }

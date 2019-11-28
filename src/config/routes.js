import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Platform} from 'react-native';
import Colors from './colors';
import LoginScreen from '../screens/LoginScreen';
import ForgotScreen from '../screens/ForgotScreen';
import SignupScreen from '../screens/SignupScreen';
import TodaysGoalScreen from '../screens/TodaysGoalScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MoreScreen from '../screens/MoreScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import HIWScreen from '../screens/HIWScreen';
import SplashScreen from '../screens/SplashScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import PreviousTaskScreen from '../screens/PreviousTaskScreen';
import WebviewScreen from '../screens/WebviewScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import PaymentScreen from '../screens/PaymentScreen';
import WorkoutViewScreen from '../screens/WorkoutViewScreen';
import PaypalScreen from '../screens/PaypalScreen';
import EbookViewScreen from '../screens/EbookViewScreen';
import ShippingDetailsScreen from '../screens/ShippingDetailsScreen';
import MyFitFoGolfGoals from '../screens/MyFitFoGolfGoals';

const Routes = createBottomTabNavigator(
  {
    TodaysGoal: {
      screen: TodaysGoalScreen,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    More: {
      screen: MoreScreen,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#7c7b7b',
      activeBackgroundColor:
        Platform.OS === 'ios' ? Colors.defaultColor : Colors.defaultColor,
      indicatorStyle: {
        backgroundColor: Colors.defaultColor,
        height: 50,
      },
      inactiveBackgroundColor: Colors.defaultColor,
      style: {
        backgroundColor: Colors.defaultColor,
      },
      showIcon: true,
      showLabel: true,
      labelStyle: {
        fontSize: 10,
        fontWeight: 'bold',
      },
      tabStyle: {
        height: 50,
      },
    },
    initialRouteName: 'TodaysGoal',
    tabBarPosition: 'bottom',
  },
);

const ModalStack = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Forgot: {
    screen: ForgotScreen,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      header: null,
    },
  },
  Main: {
    screen: Routes,
    navigationOptions: {
      header: null,
    },
  },
  AboutUs: {
    screen: AboutUsScreen,
    navigationOptions: {
      header: null,
    },
  },
  HIW: {
    screen: HIWScreen,
    navigationOptions: {
      header: null,
    },
  },
  ONDATE: {
    screen: TodaysGoalScreen,
    navigationOptions: {
      header: null,
    },
  },
  Connection: {
    screen: ConnectionScreen,
    navigationOptions: {
      header: null,
    },
  },
  PreviousTask: {
    screen: PreviousTaskScreen,
    navigationOptions: {
      header: null,
    },
  },
  Webview: {
    screen: WebviewScreen,
    navigationOptions: {
      header: null,
    },
  },
  MyFitFoGolfGoals: {
    screen: MyFitFoGolfGoals,
    navigationOptions: {
      header: null,
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: null,
    },
  },
  Favourite: {
    screen: FavouriteScreen,
    navigationOptions: {
      header: null,
    },
  },
  Workout: {
    screen: WorkoutScreen,
    navigationOptions: {
      header: null,
    },
  },
  Payment: {
    screen: PaymentScreen,
    navigationOptions: {
      header: null,
    },
  },
  WorkoutView: {
    screen: WorkoutViewScreen,
    navigationOptions: {
      header: null,
    },
  },
  Paypal: {
    screen: PaypalScreen,
    navigationOptions: {
      header: null,
    },
  },
  Ebook: {
    screen: EbookViewScreen,
    navigationOptions: {
      header: null,
    },
  },
  ShippingDeatils: {
    screen: ShippingDetailsScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(ModalStack);

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';
import settings from '../../config/settings';
import {NavigationActions} from 'react-navigation';
import styles from './style';

var iconName = 'favorite-border';
class Header extends React.PureComponent {
  componentWillMount() {
    iconName = this.props.iconName ? this.props.iconName : '-';
  }

  // on pressing back button
  backPressed = () => {
    if (this.props.missPrevScreen !== null && this.props.missPrevScreen) {
      this.props.NavigationActions();
    } else {
      this.props.navigator.dispatch(NavigationActions.back());
    }
  };

  //like press change icon
  likePress = () => {
    if (iconName === 'favorite-border') {
      iconName = 'favorite';
      this.props.favoritePress(true);
    } else {
      iconName = 'favorite-border';
      this.props.favoritePress(false);
    }
  };

  render() {
    const nameOfIcon = this.props;
    iconName = this.props.iconName ? this.props.iconName : '-';

    return (
      <View
        style={{
          width: '100%',
          height: 45,
          backgroundColor: colors.defaultColor,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            width: '100%',
            textAlign: 'center',
            fontSize: 15,
          }}>
          {this.props.screenName}
        </Text>
        {this.props.backIcon && (
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
            onPress={this.backPressed}>
            <Icon
              style={{color: 'white'}}
              name={'chevron-left'}
              size={settings.backIcon}
            />
          </TouchableOpacity>
        )}
        {this.props.heart && (
          <TouchableOpacity
            style={{position: 'absolute', right: 10}}
            onPress={this.likePress}>
            <Icon
              style={{color: 'white'}}
              name={iconName}
              size={settings.backIcon}
            />
          </TouchableOpacity>
        )}
        {this.props.downloadAll && (
          <TouchableOpacity
            style={{position: 'absolute', right: 10}}
            onPress={this.props.onDownloadAllWorkoutsPress}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>download all videos</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Header;

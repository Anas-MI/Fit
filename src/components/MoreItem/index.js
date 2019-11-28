import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';
import styles from './style.js';

class MoreItem extends React.PureComponent {

  // press event of touchable opacity
    onPressed = () => {
      if (this.props.isClickable) {
        this.props.onPressed();
      }
    }

  render() {
    return(
        <TouchableOpacity style={styles.container} onPress={this.onPressed}>
        <Text style={{color: colors.defaultColor, width: '100%', fontSize: 15}}>
          {this.props.title}
        </Text>
        <Icon style={{position: 'absolute', right: 10}} name={"chevron-right"} size={20} />
      </TouchableOpacity>
    );
  }
}

export default (MoreItem);

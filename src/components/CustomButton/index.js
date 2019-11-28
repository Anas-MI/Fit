import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style.js';

const CustomButton = ({icon, title, style, onPress}) => (
  <TouchableOpacity style={[styles.loginbutton, style]} onPress={onPress}>
    {icon}
    <Text style={styles.loginText}>{title}</Text>
  </TouchableOpacity>
);

export default CustomButton;

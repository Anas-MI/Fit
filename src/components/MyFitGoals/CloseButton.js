import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CloseButton = ({style, onPress}) => (
  <View style={style}>
    <Text onPress={onPress}>
      {<FontAwesome size={20} color="white" name="close" />}
    </Text>
  </View>
);

export default CloseButton;

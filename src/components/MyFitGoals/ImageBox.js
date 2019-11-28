import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const W = Dimensions.get('window').width;

const ImageBox = ({onPress, title, uri, placeholder}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    {placeholder ? (
      <MCIcon name={placeholder} color="black" size={50} />
    ) : (
      <Image
        source={{uri}}
        resizeMode="contain"
        resizeMethod="scale"
        style={styles.image}
      />
    )}
    <View style={styles.divider} />
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '90%',
    elevation: 2,
    height: 'auto',
    shadowRadius: 2,
    borderRadius: 10,
    marginVertical: 10,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
  },
  image: {
    height: 250,
    width: W - 60,
  },
  divider: {
    height: 2,
    width: W / 2,
    marginVertical: 5,
    backgroundColor: '#eee',
  },
});

export {ImageBox};

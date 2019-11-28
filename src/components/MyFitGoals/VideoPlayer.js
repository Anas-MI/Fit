import React, {useState} from 'react';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import CloseButton from './CloseButton';

const VideoPlayer = ({uri, visible, onClose, onBuffer, videoError}) => {
  const [isPaused, setPaused] = useState(false);
  const [toggleToolbar, setToggleToolbar] = useState(false);

  function generateIcon(name, size = 30) {
    return <FontAwesome name={name} color="white" size={size} />;
  }
  return visible ? (
    <View style={styles.container}>
      {toggleToolbar && (
        <CloseButton onPress={onClose} style={styles.close_button} />
      )}
      {toggleToolbar && (
        <View style={styles.toolbar}>
          <Text onPress={() => setPaused(!isPaused)}>
            {isPaused
              ? generateIcon('play-circle')
              : generateIcon('pause-circle')}
          </Text>
        </View>
      )}
      <TouchableWithoutFeedback
        onPress={() => setToggleToolbar(!toggleToolbar)}>
        <Video
          source={{uri}}
          paused={isPaused}
          onBuffer={onBuffer}
          resizeMode="contain"
          onError={videoError}
          style={styles.backgroundVideo}
        />
      </TouchableWithoutFeedback>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
  toolbar: {
    zIndex: 2,
    bottom: 20,
    width: '40%',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
  },
  close_button: {
    top: 30,
    left: 20,
    zIndex: 2,
    position: 'absolute',
  },
});

export {VideoPlayer};

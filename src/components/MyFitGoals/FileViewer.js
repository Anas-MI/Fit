import Pdf from 'react-native-pdf';
import React, {useState} from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import {Dimensions, ActivityIndicator} from 'react-native';
import {Text, View, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CloseButton from './CloseButton';

const size = Dimensions.get('window');

const FileViewer = ({link, onPressClose}) => {
  const [isLoading, imageLoaded] = useState(false);
  const indicator = (
    <ActivityIndicator size="large" color="white" style={styles.indicator} />
  );
  return link ? (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.image_view(isLoading)}>
        {link.endsWith('pdf') ? (
          <Pdf
            style={styles.pdf}
            source={{uri: link}}
            activityIndicator={indicator}
          />
        ) : (
          <ImageZoom
            cropWidth={size.width}
            imageWidth={size.width}
            cropHeight={size.height}
            imageHeight={size.height}>
            <Image
              resizeMethod="scale"
              resizeMode="contain"
              style={styles.image}
              source={{uri: link}}
              onLoad={() => imageLoaded(false)}
              onLoadStart={() => imageLoaded(true)}
            />
          </ImageZoom>
        )}
      </View>
      {isLoading && indicator}

      <CloseButton onPress={onPressClose} style={styles.close_background} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  background: {
    opacity: 0.5,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
  },
  image: {
    width: size.width,
    height: size.height,
  },
  pdf: {
    flex: 1,
    borderRadius: 10,
    width: size.width - 20,
    backgroundColor: 'transparent',
  },
  scroll_view: {
    borderRadius: 10,
  },
  image_view: function(isLoading) {
    return {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: isLoading ? null : '100%',
      height: isLoading ? null : '100%',
    };
  },
  close_background: {
    top: 25,
    left: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
  },
});

export {FileViewer};

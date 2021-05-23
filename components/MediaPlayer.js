
import React, { useState } from 'react';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

//Function how handle media player
const MediaPlayer = (props) => {
  const sound = React.useRef(new Audio.Sound());
  const [Status, SetStatus] = React.useState(false);

  React.useEffect(() => {
    return () => sound.current.unloadAsync();
  }, []);

  //Load the audio by props.
  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();
    try {
      const result = await sound.current.loadAsync({ uri: props.songURL }, {}, true);
      if (result.isLoaded === false) {
        console.log('Error in Loading Audio');
      } else {
        PlayAudio();
      }
    } catch (error) {
      console.log('Error in Loading Audio');
    }
  };

  //Play music function
  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          SetStatus(true);
        }
      } else {
        LoadAudio();
      }
    } catch (error) {
      SetStatus(false);
    }
  };

  //Pause the Music if the sound isPlaying
  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          SetStatus(false);
        }
      }
    } catch (error) {
      SetStatus(false);
    }
  };

  //Mediaplayer View
  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <Text style={styles.songTitleText}>{props.songTitle}</Text>
        <View style={styles.rightView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => PlayAudio()}
          >
            <View>
              <Icon
                name={props.playMusic}
                style={styles.iconStyle}
                size={26}
                color="#10DDE5"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => PauseAudio()}
          >
            <View>
              <Icon
                name={props.pauseMusic}
                style={styles.iconStyle}
                size={26}
                color="#10DDE5"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

//Access the states from the redux store
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  songs: store.userState.songs,
});

export default connect(mapStateToProps, null)(MediaPlayer);

//Style for the view
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  stopButton: {
    marginTop: 10,
  },
  parent: {
    flexDirection: 'row',
  },
  songTitleText: {
    marginTop: 5,
  },
  rightView: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  container: {
    height: 30,
    borderStyle: 'solid',
    borderRadius: 30,
    borderColor: 'white',
    marginLeft: 20,
    margin: 13,
  },
  spinnerTextStyle: {
    color: '#ffffff',
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconStyles: {
    fontSize: 25,
    color: '#EFA600',
  },
  textButton: {
    color: 'white',
    alignSelf: 'flex-end',
    fontWeight: '500',
    fontSize: 18,
  },
});

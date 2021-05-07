
import React, { useState } from 'react';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import { connect } from 'react-redux';

//import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const MediaPlayer = (props) => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userSongPosts, setSongs] = useState([]);
  const { currentUser, songs } = props;
  const [isPlaying, setIsPlaying] = useState(false);

  const sound = React.useRef(new Audio.Sound());
  const [Status, SetStatus] = React.useState(false);
  
  React.useEffect(() => {
    
    return () => sound.current.unloadAsync();
  }, []);
  
  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();
    try {
      const result = await sound.current.loadAsync({ uri: props.songURL }, {}, true);
      // Here Song is the uri of the Audio file
      if (result.isLoaded === false) {
        console.log('Error in Loading Audio');
      } else {
        PlayAudio();
      }
    } catch (error) {
      console.log('Error in Loading Audio');
    }
  };
  
  
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



  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text>{Status === false  ? 'Stopped' : 'Playing now'}</Text>
      <View style={{ width: '100%' }}>
        <Button title="Play Sound" onPress={() => PlayAudio()} />
        <Button title="Pause Sound" onPress={() => PauseAudio()} />
      </View>
    </View>
  );
};


//Access the store states from redux
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  songs: store.userState.songs,
});

export default connect(mapStateToProps, null)(MediaPlayer);



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  stopButton: {
    marginTop:30,
  },
  container: {
    height: 50,
    width: 200,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderRadius: 30,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#875195',
    marginTop: '10%',
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
    marginLeft: 12,
    color: '#EFA600',
  },
  textButton: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
});


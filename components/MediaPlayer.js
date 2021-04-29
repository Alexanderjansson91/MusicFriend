
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
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const MediaPlayer = (props) => {

  const [loading, setLoading] = useState(false);
  const [sound, setSound] = React.useState();
  const [user, setUser] = useState(null);
  const [userSongPosts, setSongs] = useState([]);
  const { currentUser, songs } = props;


  async function playSound() {
       
    const { sound } = await Audio.Sound.createAsync(
    //{uri: 'https://firebasestorage.googleapis.com/v0/b/musicfriendsapp.appspot.com/o/audio%2FxqGTuOboXMN0yLv4L0ICBgNqBJv1%2F0.xwf4pkmbhhi?alt=media&token=6185742d-e269-432c-9c67-b0789e42fb29'},
    {uri: props.songURL}
    );
    
    setSound(songs);
    setSongs(userSongPosts)
    console.log('Playing Sound');
    await sound.playAsync(); }


  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  async function stopPlaying() {
    await sound.pauseAsync(); }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <TouchableOpacity
            style={styles.profilContainer}
            onPress= {() =>{startLoading(); stopPlaying(); playSound(); props.playMusicClick}}>
            <View style={styles.buttonView}>
              <Text style={styles.textButton}>{props.submitText}</Text>
              
              <MatetrialCommunityIcons
                style={styles.iconStyles}
                name={props.icon}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
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


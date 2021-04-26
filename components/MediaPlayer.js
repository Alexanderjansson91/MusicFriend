import React, { useState } from 'react';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';

import firebase from 'firebase';
require('firebase/firestore')
//import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const MediaPlayer = (props) => {
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = React.useState();
  const [posts, setPosts] = useState([])

  async function playSound() {

    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("usersSong")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
        })
       setPosts(posts)

    })
    console.log('Here is the Sound' + posts.downloadURL);
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
    //{uri: 'https://firebasestorage.googleapis.com/v0/b/musicfriendsapp.appspot.com/o/post%2FxqGTuOboXMN0yLv4L0ICBgNqBJv1%2F0.thduvq3hsic?alt=media&token=1a22f80a-3352-4caf-9106-21e1426699a6'}
    {uri: posts.downloadURL}
    
    );
    setSound(sound);
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

<View>

      
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
                            onPress= {() =>{startLoading(); playSound(posts.downloadURL); }}>
                            <View style={styles.buttonView}>
                              <Text style={styles.textButton}>{props.playSongButton}</Text>
                              <MatetrialCommunityIcons
                                style={styles.iconStyles}
                                name={props.icon}
                              />
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>

                    

           
</View>
    </SafeAreaView>
  );
};

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

export default MediaPlayer
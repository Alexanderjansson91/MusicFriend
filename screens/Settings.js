import React, { useState }  from 'react'
import { StyleSheet, View, Text, Button, alert, TouchableOpacity, Image, TextInput } from 'react-native';
import HeaderView from '../components/views/Header';
import MainView from '../components/views/CurvedView';
import LoginButton from '../components/buttons/LoginButton';
import CreateUserButton from '../components/buttons/NewUserButton';
import firebase from 'firebase'
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';

require('firebase/firestore');


function Settings(props) {
    const { currentUser, user } = props;
    const [name, setName] = useState(props.currentUser.name);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(props.currentUser.image);
    const [imageChanged, setImageChanged] = useState(false);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);




    const pickImage = async () => {
      if (true) {
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
          });

          if (!result.cancelled) {
              setImage(result.uri);
              setImageChanged(true);
          }
      }
  };


  const Save = async () => {
      if (imageChanged) {
          const uri = image;
          const childPath = `profile/${firebase.auth().currentUser.uid}`;

          const response = await fetch(uri);
          const blob = await response.blob();

          const task = firebase
              .storage()
              .ref()
              .child(childPath)
              .put(blob);

          const taskProgress = snapshot => {
              console.log(`transferred: ${snapshot.bytesTransferred}`)
          }

          const taskCompleted = () => {
              task.snapshot.ref.getDownloadURL().then((snapshot) => {

                  firebase.firestore().collection("users")
                      .doc(firebase.auth().currentUser.uid)
                      .update({
                          name,
                          description,
                          image: snapshot,
                      }).then(() => {
                          props.navigation.goBack()

                      })
              })
          }

          const taskError = snapshot => {
              console.log(snapshot)
          }

          task.on("state_changed", taskProgress, taskError, taskCompleted);
      } else {
          saveData({
              name,
              description,
          })
      }
  }

  const saveData = (data) => {
      firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update(data).then(() => {
              props.updateUserFeedPosts();

              props.navigation.goBack()
          })
  }
   
    const onLogout = () => {
        firebase.auth().signOut();
    };

    //Reset password for currentUser adn display an alert
    const forgotPassword = () => {
      var user = firebase.auth().currentUser.email;
      firebase
        .auth()
        .sendPasswordResetEmail(user)
        .then(function () {
          alert('En återställninslänk har skickats till din Email.')
        })
        .catch(function (e) {
          console.log(e);
        });
    };


    return (
        <View style={styles.container}>

        <TouchableOpacity  onPress={() => pickImage()} >
                {image == 'default' ?
                    (
                      <Icon name="search-outline" size={16} size={26} />
                    )
                    :
                    (
                        <Image
                            source={{
                                uri: image
                            }}
                        />
                    )
                }
                <Text>Change Profile Photo</Text>
            </TouchableOpacity>


        <Text>Profile</Text>
            <Button
            style={{marginTop:30}}
            title="Log out"
            onPress={() => onLogout()}
        />
             <Button
            style={{marginTop:30}}
            title="Återställ lösenord"
            onPress={() => forgotPassword()}
        />
              <TextInput
                value={description}
              
                placeholderTextColor={"#e8e8e8"}
                placeholder="Description"
                onChangeText={(description) => { setDescription(description); console.log(description) }}
            />
    <Button
            title="Spara"
            onPress={() => Save()} />
    </View>
    )
}
//Style for the view
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
    },
    image: {
        width:'100%'
    }

  });



  const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

export default connect(mapStateToProps, null)(Settings);

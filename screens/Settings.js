import React, { useState } from "react"
import { StyleSheet, View, Alert, TouchableWithoutFeedback } from "react-native";
import SettingsCard from '../components/cards/SettingsCard'
import firebase from "firebase"
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Keyboard } from "react-native";
require("firebase/firestore");

function Settings(props) {
  const { currentUser, user } = props;
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(props.currentUser.image);
  const [imageChanged, setImageChanged] = useState(false);

  //Pick image function and set picked image result (URI)
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

  //Save current user settings
  const Save = async () => {
    if (imageChanged) {
      const uri = image;
      const childPath = `profile/${firebase.auth().currentUser.uid}`;
      const response = await fetch(uri);
      const blob = await response.blob();
      const task = firebase.storage().ref().child(childPath).put(blob);
      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };

      //Saving the Image
      const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              description,
              image: snapshot,
            })
            .then(() => {
              Alert.alert("Profil ändrad");
            });
        });
      };

      const taskError = (snapshot) => {
        console.log(snapshot);
      };
      task.on("state_changed", taskProgress, taskError, taskCompleted);
      //Save the description data
    } else {
      saveData({
        description,
      });
    }
  };

  //Save data and display an alert with an message
  const saveData = (data) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update(data)
      .then(function () {
        Alert.alert("profil ändrad");
      });
  };

  //Reset password for currentUser and display an alert
  const forgotPassword = () => {
    var user = firebase.auth().currentUser.email;
    firebase
      .auth()
      .sendPasswordResetEmail(user)
      .then(function () {
        Alert.alert("En återställninslänk har skickats till din Email.")
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  //View for the Settingsscreen
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SettingsCard
          profileImage={currentUser.image}
          iconImage="image-outline"
          iconProilImage="image-outline"
          pickImageClick={() => pickImage()}
          pickImageText="Ändra profilbild "
          iconPickImage="image-outline"
          placeDescriptionHolder="Skriv en beskrivning om dig själv"
          onChange={(description) => {
            setDescription(description);
            console.log(description)}}
          inputValue={description}
          resetPasswordText="Återställ lösenord"
          resetPasswordClick={() => forgotPassword()}
          iconResetPassword="lock-closed-outline"
          saveClick={() => Save()}
          saveProfileText="Spara"
          iconSaveProfile="bookmark-outline"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
//Style for the view
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
  },
  ImageStyle: {
    width: "20%",
    height: "10%",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(Settings);

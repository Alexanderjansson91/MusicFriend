import React from 'react'
import { StyleSheet, View, Text, Button, alert } from 'react-native';
import HeaderView from '../components/views/Header';
import MainView from '../components/views/CurvedView';
import LoginButton from '../components/buttons/LoginButton';
import CreateUserButton from '../components/buttons/NewUserButton';
import firebase from 'firebase'
require('firebase/firestore');


export default function Settings(props) {
    const { currentUser, user } = props;

   
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
        <HeaderView 
        headerText="Music Buddy"
        icon="cog-outline"
        click={() => props.navigation.navigate('Settings')}
        />
        <MainView></MainView>
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
  });
  
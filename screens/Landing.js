import React from 'react'
import { StyleSheet, View } from 'react-native';
import HeaderView from '../components/views/Header';
import MainView from '../components/views/CurvedView';
import LoginButton from '../components/buttons/LoginButton';
import CreateUserButton from '../components/buttons/NewUserButton';


export default function Landing({ navigation }) {
    return (
        <View style={styles.container}>
           <HeaderView headerText="Music Buddy"/>
           <MainView></MainView>
           <LoginButton 
           textButton="Logga in"
           click={() => navigation.navigate("Login")}
           />
            <CreateUserButton 
           textButton="Skapa ny användare"
           click={() => navigation.navigate("Register")}
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
  
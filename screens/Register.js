import React, { Component } from 'react';
import { View, Alert,  } from 'react-native';
import NameField from '../components/textFields/LoginTextField'
import PasswordTextfield from '../components/textFields/PasswordTextField'
import EmailField from '../components/textFields/EmailTextField'
import HeaderView from '../components/views/Header';
import RegisterButton from '../components/buttons/RegisterButton'
import CreateNewUserCard from '../components/cards/NewUserCard';

import firebase from 'firebase'
import { StyleSheet } from 'react-native';

export class Register extends Component {

    constructor(props) {
        super(props)  
        this.state = {
            email : '',
            password: '',
            name: '',
            image: 'default',
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const {email, password, name, image} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email,
                image
            })
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
            Alert.alert(error.message)
        })
    }

    render() {
        const {navigate} =this.props.navigation;
        return (
            <View style ={styles.viewContainer}>
                <HeaderView headerText="Music Friends"/>
                <NameField 
                placeHolder="Namn"
                onChange={(name) => this.setState({name})}
                />
                <EmailField 
                placeHolder="Email"
                onChange={(email) => this.setState({email})}
                />
                <PasswordTextfield 
                placeHolder="Lösenord"
                onChange={(password) => this.setState({password})}
                />
 
                <RegisterButton 
                click={() => this.onSignUp()}
                textButton="Bli medlem"
                />
                <View style={styles.bottom}>
                <CreateNewUserCard
                readMoreText="Är du redan medlem?"
                textInfo="Logga in"
                click={() => this.props.navigation.navigate("Login")}
                />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
      backgroundColor: '#ffffff',
      height:'100%',
    },
    bottom:{
        marginBottom:'40%'
    }

  });

export default Register
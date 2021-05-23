import React, { Component } from 'react'
import { StyleSheet, View, Button, TextInput, Text, Alert } from 'react-native';
import HeaderView from '../components/views/Header';
import MainView from '../components/views/CurvedView';
import LoginButton from '../components/buttons/LoginButton';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import LoginTextField from '../components/textFields/LoginTextField'
import LostPasswordTextField from '../components/textFields/PasswordTextField'
import LostPasswordButton from '../components/buttons/SendNewPasswordButton'


import PassWordTextField from '../components/textFields/PasswordTextField'
import firebase from 'firebase'
import CreateNewUserCard from '../components/cards/NewUserCard';

//Landing page how handling login and forgot password
export class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  //SignUp function using firebase
  onSignUp() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  }

  //Forgot password function
  forgotPassword() {
    const { email } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((result) => {
        console.log(result);
        Alert.alert('Please check your email.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // View for the Landing
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.viewContainer}>
        <HeaderView headerText="Music Friends" />
        <LoginTextField
          placeHolder="email"
          onChange={(email) => this.setState({ email })}
        />
        <PassWordTextField
          placeHolder="password"
          secureTextEntry={true}
          onChange={(password) => this.setState({ password })}
        />
        <LoginButton click={() => this.onSignUp()} textButton="Logga in" />
        <View>
          {/* Collapse view för Lost password */}
          <Collapse>
            <CollapseHeader>
              <View style={styles.collapseContainer}>
                <Text>Glömt lösenord?</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Collapse>
                <CollapseHeader>
                  <LostPasswordTextField
                    placeHolder="email"
                    onChange={(email) => this.setState({ email })}
                  />
                  <LostPasswordButton
                    click={() => this.forgotPassword()}
                    textButton="Skicka lösenord"
                  />
                </CollapseHeader>
              </Collapse>
            </CollapseBody>
          </Collapse>
          <CreateNewUserCard
            readMoreText="Vill du bli medlem?"
            textInfo="Registera dig"
            click={() => this.props.navigation.navigate("Register")}
          />
        </View>
      </View>
    );
  }
}

export default Landing;

//Styles for the view
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ffffff',
    height:'100%',
  },
  collapseContainer: {
    width: 600,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

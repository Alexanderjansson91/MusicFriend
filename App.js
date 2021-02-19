
import { Text, View, Button } from 'react-native';
import React, { Component } from 'react';

import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen, { Main } from './components/auth/Navigation/Main'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk)) 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF9wM0EFGyj--5Sh4jOesDcJY8EpVu5jM",
  authDomain: "musicfriendsapp.firebaseapp.com",
  projectId: "musicfriendsapp",
  storageBucket: "musicfriendsapp.appspot.com",
  messagingSenderId: "504353875002",
  appId: "1:504353875002:web:ea2aa92250c51f41dec103",
  measurementId: "G-N3BCDZ54QK"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

  //Log out currentuser
  const onLogout = () => {
    firebase.auth().signOut();
  };

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       loaded: false, 
    }
  }

  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user){
        this.setState({
          loggedIn: false, 
          loaded: true, 
        })
      }else {
        this.setState({
          loggedIn: true, 
          loaded: true, 
        })
      }
    })
  }
  render() {
    const {loggedIn, loaded } = this.state; 
    if(!loaded){
      return(
        <View style= {{ flex:1, justifyContent:'center' }}>
          <Text>Loaded</Text>
        </View>
      )
    }
    if (!loggedIn){
      return (
       
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name ="Landing" component={LandingScreen}
            options={{headerShown: false}}
            />
            <Stack.Screen name ="Register" component={RegisterScreen}/>
            <Stack.Screen name ="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
        
      );
    }
    return(
     <Provider store={store}>
       <MainScreen/>
     </Provider>
    )
  }
}

export default App


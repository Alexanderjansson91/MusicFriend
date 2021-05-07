
import { Text, View, Button } from 'react-native';
import React, { Component } from 'react';

import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/Landing'
import CommentScreen from './screens/Comment'

import AddNewSongScreen from './screens/AddSong'
import RegisterScreen from './screens/Register'
import MainScreen, { Main } from './components/auth/Navigation/Main'
import AddScreen from './screens/Add'
import SettingsScreen from  './screens/Settings'

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
          </Stack.Navigator>
        </NavigationContainer>
        
      );
    }
    return(
     <Provider store={store}>
       <NavigationContainer>
       <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name ="Landing" component={MainScreen}
            options={{headerShown: false}}
            />
            <Stack.Screen name ="Add" component={AddScreen}
            />
            <Stack.Screen name ="Comment" component={CommentScreen}
            />
            <Stack.Screen name ="NewSong" component={AddNewSongScreen}
            />
            <Stack.Screen name ="Settings" component={SettingsScreen}
            
            />

          </Stack.Navigator>
          </NavigationContainer>
     </Provider>
    )
  }
}

export default App


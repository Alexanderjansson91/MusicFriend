
import { Text, View, Alert } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from "@react-native-community/netinfo";


import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/Landing'
import CommentScreen from './screens/Comment'

import SignOutButton from './components/buttons/SignOutButton'
import AddNewSongScreen from './screens/AddSong'
import RegisterScreen from './screens/Register'
import MainScreen, { Main } from './components/auth/Navigation/Main'
import AddScreen from './screens/Add'
import SettingsScreen from  './screens/Settings'
import ProfileScreen from './screens/Profile'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk)) 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       loaded: false, 
       type: null,
    }
  }

  
  componentDidMount() {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
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

     
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
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
            <Stack.Screen name ="Register" component={RegisterScreen}
            options={{headerShown: false}}
            />
            <Stack.Screen name ="Login" component={LandingScreen}
            options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        
      );
    }
    return(
     <Provider store={store}>
       <NavigationContainer>
       <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name ="Feed" component={MainScreen}
            options={{headerShown: false}}
            />
             <Stack.Screen name ="Profile" component={ProfileScreen}
            options={{headerShown: false}}
            />
            <Stack.Screen  name ="Add" component={AddScreen}
             options={{
              headerTitle: 'Ny annons',
              headerBackTitle: 'Tillbaka',
              headerStyle: { backgroundColor: '#ffffff' },
              headerTintColor: '#10DDE5',
            }}
            />
            <Stack.Screen name ="Comment" component={CommentScreen}
              options={{
              headerTitle: 'Ny annons',
              headerBackTitle: 'Tillbaka',
              headerStyle: { backgroundColor: '#ffffff' },
              headerTintColor: '#10DDE5',
            }}
            />
            <Stack.Screen name ="NewSong" component={AddNewSongScreen}
              options={{
                headerTitle: 'Lägg ny låt',
                headerBackTitle: 'Profil',
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#10DDE5',
              }}
            />
            <Stack.Screen name ="Settings" component={SettingsScreen}
              options={{
                headerRight: () => (
                  <SignOutButton 
                  click={() => this.signOutUser()}
                  signOutIcon="log-out-outline"
                  />
                ),
                headerTitle: 'Inställningar',
                headerBackTitle: 'Profil',
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#10DDE5',
          
              }}
            />

          </Stack.Navigator>
          </NavigationContainer>
     </Provider>
    )
  }
}

export default App


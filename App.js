
import { Text, View, Button } from 'react-native';
import React, { Component } from 'react';

import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/Landing'
import CommentScreen from './screens/Comment'

import RegisterScreen from './screens/Register'
import LoginScreen from './screens/Login'
import MainScreen, { Main } from './components/auth/Navigation/Main'

import AddScreen from './screens/Add'



import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk)) 


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
       <NavigationContainer>
       <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name ="Landing" component={MainScreen}
            options={{headerShown: false}}
            />
            <Stack.Screen name ="Add" component={AddScreen}
            />
            <Stack.Screen name ="Comment" component={CommentScreen}
            />
          </Stack.Navigator>
          </NavigationContainer>
     </Provider>
    )
  }
}

export default App


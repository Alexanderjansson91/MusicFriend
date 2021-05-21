import React, { Component } from 'react';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import MainNavigation from './navigation/MainNavigation';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export class App extends Component {
  render() {
    return (
     <MainNavigation /> 
   );
  } 
}
export default App;
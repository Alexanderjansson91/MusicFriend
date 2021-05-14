import React, { useState } from 'react'
import { View, StyleSheet, Image, Button, Text } from 'react-native'

import moment from "moment";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
import Cities from '../components/data/LocationsData'
import { Picker } from '@react-native-picker/picker';
import CaptionTextField from '../components/textFields/CaptionTextfield'
import ShowDate from '../components/buttons/ShowDateButton'
import CityPickedField from '../components/cards/InfoPickedTown'
import AddPostButton from '../components/buttons/AddButton'
export default function Add(props) {
  const [caption, setCaption] = useState("")
  const [city, setCity] = useState("")
  const [dateUpload, setDateUpload] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  var arrayOfPeople = [
    { name: "Rick", age: 30, place: 2 },
    { name: "Alan", age: 25, place: 1 },
    { name: "Joe", age: 40, place: 4 },
    { name: "Dave", age: 35, place: 3 }
  ];

  const createdAt = firebase.firestore.Timestamp.fromDate(new Date());

  // then using dayjs library you can display your date as you want.
  
  const formatDate = moment(createdAt.seconds).format("ll");


  function bubbleSort(a, par) {
    var swapped;
    do {
      swapped = false;
      for (var i = 0; i < a.length - 1; i++) {
        if (a[i][par] < a[i + 1][par]) {
          var temp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    for (i = 0; i < Cities.length; i++) {
      console.log(Cities[i]);
    }
  }

  bubbleSort(Cities, 'inhabitant');


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
    const formatDate = moment(date).format("ll");
    console.warn("A date has been picked: ", formatDate);
    
    setDateUpload(formatDate)
    hideDatePicker();
  };

  const savePostData = () => {
    firebase.firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        caption,
        dateUpload,
        city,
        formatDate,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      }).then((function () {
        props.navigation.popToTop()
      }))
  }
  return (
    <View style={styles.container}>
      <ShowDate textButton="Datum" iconDate="calendar-outline" click={showDatePicker}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.pickerView}>
      <CaptionTextField
        placeHolder="beskrivning"
        onChange={(caption) => setCaption(caption)}
      />
      <Picker
        mode="dropdown"
        selectedValue={city}
        onValueChange={(city) => setCity(city)}>
        {Cities.map((item, index) => {
          return (<Picker.Item label={item.title} value={item.title} key={index} />)
        })}
      </Picker>
      <CityPickedField  cityText={city}/>
      <AddPostButton textButton="Spara" iconSave="add-outline" click={() => savePostData()}/>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  pickerView: {
    borderWidth:1,
    borderStyle:'solid',
    width:'95%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
})
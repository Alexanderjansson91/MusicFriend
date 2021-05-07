import React, { useState } from 'react'
import { View, TextInput, Image, Button, Text } from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
import Cities from '../components/data/LocationsData'
import { Picker } from '@react-native-picker/picker';

export default function Add(props) {
  const [caption, setCaption] = useState("")
  const [city, setCity] = useState("")
  const [dateUpload, setDateUpload] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  var arrayOfPeople = [
    {name: "Rick", age: 30, place: 2},
    {name: "Alan", age: 25, place: 1},
    {name: "Joe", age: 40, place: 4},
    {name: "Dave", age: 35, place: 3}
];

function bubbleSort(a, par)
{
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
    console.warn("A date has been picked: ", date);
    setDateUpload(date)
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
        creation: firebase.firestore.FieldValue.serverTimestamp()
      }).then((function () {
        props.navigation.popToTop()
      }))
  }
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Picker
        mode="dropdown"
        selectedValue={city}
        onValueChange={(city) => setCity(city)}>
        {Cities.map((item, index) => {
          return (<Picker.Item label={item.title} value={item.title} key={index} />)
        })}
      </Picker>
      <Text>{city}</Text>
      <Button title="Save" onPress={() => savePostData()} />
    </View>
  )
}
import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { patchWebProps } from 'react-native-elements/dist/helpers';
import CachedImage from 'react-native-expo-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';

//View for the Settingscard
const AddNewSongCard = (props) => {
  const { viewContainer, textInput, imageView } = styles;
  let numOfLinesCompany = 0;
  return (
    <View style={viewContainer}>
      <View style={imageView}>
        <CachedImage
          style={styles.ImageStyle}
          source={{uri: props.profileImage}}
        />
      </View>
      <View style={styles.styleInputView}>
        <TouchableOpacity
          style={styles.styleButton}
          onPress={props.pickImageClick}
        >
          <View style={styles.styleView}>
            <Icon name={props.iconPickImage} style={styles.iconStyle} />
            <Text style={styles.textStyle}>{props.pickImageText}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.styleButton}
          onPress={props.resetPasswordClick}
        >
          <View style={styles.styleView}>
            <Icon name={props.iconResetPassword} style={styles.iconStyle} />
            <Text style={styles.textStyle}>{props.resetPasswordText}</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder={props.placeDescriptionHolder}
          onChangeText={props.onChange}
          onClear={props.Clear}
          style={textInput}
          value={props.inputValue}
          numberOfLines={5}
          multiline={true}
          maxLength={200}
        />
      </View>
      <View style={styles.saveSettings}>
        <TouchableOpacity
          style={styles.saveSettingsButton}
          onPress={props.saveClick}
        >
          <View style={styles.saveSettingsView}>
            <Text style={styles.saveText}>{props.saveProfileText}</Text>
            <Icon name={props.iconSaveProfile} style={styles.iconStyle} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Style for Email Textfield
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
  },
  styleInputView:{
    width:"100%"
  },
  styleButton: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth:1,
    borderColor:"lightgrey",
    marginTop: 50,
    bottom: 0,
    position: 'relative',
  },
  styleView: {
    flexDirection: 'row',
  },
  ImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor:'#000000',
    borderWidth: 1,
  },
  imageView: {
    textAlign: "center",
    alignItems: 'center',
    marginTop: 50,
  },
  saveSettingsView: {
    flexDirection: 'row',
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#000000',
    padding: 13,
    paddingLeft: 100,
    paddingRight: 100,
  },
  saveSettings: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 30,
  },
  textStyle: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  iconStyle: {
    fontSize: 20,
    color: '#10DDE5',
  },
  saveSettingsButton: {
    alignSelf: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  saveText: {
    color: '#10DDE5',
    fontSize: 20,
    marginRight: 10,
  },
  textInput: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    fontWeight: '600',
    color: 'black',
    fontSize: 17,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius:20,
    height: 120,
    borderColor: 'lightgrey',
    width: '95%',
    marginTop: 50,
    alignSelf: 'center',
  },
});

export default AddNewSongCard;

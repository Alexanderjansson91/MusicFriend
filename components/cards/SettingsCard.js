import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { patchWebProps } from 'react-native-elements/dist/helpers';
import CachedImage from 'react-native-expo-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';

//Style for the Settingscard
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
      <View>
        <TouchableOpacity
          style={styles.pickSongButton}
          onPress={props.pickImageClick}
        >
          <View style={styles.pickSongView}>
            <Text style={styles.pickNewSong}>{props.pickImageText}</Text>
            <Icon name={props.iconPickImage} style={styles.iconStyle} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickSongButton}
          onPress={props.resetPasswordClick}
        >
          <View style={styles.pickSongView}>
            <Text style={styles.pickNewSong}>{props.resetPasswordText}</Text>
            <Icon name={props.iconResetPassword} style={styles.iconStyle} />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder={props.placeDescriptionHolder}
          onChangeText={props.onChange}
          onClear={props.Clear}
          style={textInput}
          value={props.inputValue}
          numberOfLines={numOfLinesCompany}
          onContentSizeChange={(e) => {
            numOfLinesCompany = e.nativeEvent.contentSize.height / 18;
          }}
        />
      </View>
      <View style={styles.saveSong}>
        <TouchableOpacity
          style={styles.saveSongButton}
          onPress={props.saveClick}
        >
          <View style={styles.saveSongView}>
            <Text style={styles.saveNewSong}>{props.saveProfileText}</Text>
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
  pickSongButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 50,
    bottom: 0,
    position: 'relative',
  },
  pickSongView: {
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
  saveSongView: {
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
  saveSong: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 30,
  },
  pickNewSong: {
    fontSize: 25,
  },
  iconStyle: {
    fontSize: 25,
    color: '#10DDE5',
  },
  saveSongButton: {
    alignSelf: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  saveNewSong: {
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
    height: 100,
    borderColor: '#10DDE5',
    width: '80%',
    marginTop: 50,
    alignSelf: 'center',
  },
});

export default AddNewSongCard;

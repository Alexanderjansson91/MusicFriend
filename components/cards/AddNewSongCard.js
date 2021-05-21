import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { patchWebProps } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/Ionicons';

//Email Textfield for sign in
const AddNewSongCard = (props) => {
  const { viewContainer, textInput } = styles;

  return (
    <View style={viewContainer}>
      <View>
        <TextInput
          placeholder={props.placeHolder}
          onChangeText={props.onChange}
          onClear={props.Clear}
          style={textInput}
          value={props.searchValue}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.pickSongButton}
          onPress={props.pickClick}
        >
          <View style={styles.pickSongView}>
            <Text style={styles.pickNewSong}>{props.pickNewSongText}</Text>
            <Icon name={props.iconPickMusic} style={styles.iconStyle} />
          </View>
        </TouchableOpacity>
      </View>
      <Text>{props.songUrl}</Text>
      <View style={styles.saveSong}>
        <TouchableOpacity
          style={styles.saveSongButton}
          onPress={props.saveClick}
        >
          <View style={styles.saveSongView}>
            <Text style={styles.saveNewSong}>{props.saveNewSongText}</Text>
            <Icon name={props.iconsaveMusic} style={styles.iconStyle} />
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
    flexDirection:'row',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 50,
    bottom: 0,
    position: 'relative',
  },
  pickSongView: {
    flexDirection:'row',
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
  saveSongButton:{
    alignSelf: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  saveNewSong:{
    color: '#10DDE5',
    fontSize: 20,
    marginRight: 10,
  },
  textInput: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    alignItems: 'center',
    fontWeight: '600',
    color: 'black',
    fontSize: 17,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#10DDE5',
    width: '80%',
    marginTop: 50,
    alignSelf: 'center',
  },
});

export default AddNewSongCard;
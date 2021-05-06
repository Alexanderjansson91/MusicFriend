import React, { useState } from 'react'
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import SearchField from '../components/textFields/SearchField'
import SearchResultButton from '../components/buttons/SearchResultButton'
import { connect } from 'react-redux'
import CachedImage from 'react-native-expo-cached-image';

import firebase from 'firebase';
require('firebase/firestore');

import { SearchBar } from 'react-native-elements';


function Search(props) {
    const [search, setSearch] = useState('');
    const {allUsers, setallUsers} = props;

    const [filteredDataSource, setFilteredDataSource] =  useState(allUsers);
    const [masterDataSource, setMasterDataSource] = useState(allUsers);

  //The function for the playground screen
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

    return (
        <View style={styles.viewContainer}>
            
        <SearchField
          placeHolder="Sök personer"
          onChange={(text) => searchFilterFunction(text)}
          Clear={(text) => searchFilterFunction('')}
          placeholder="Sök personer"
          searchValue={search}
        />
          
 <FlatList
     
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          horizontal={false}
          data={filteredDataSource}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <CachedImage
                style={styles.ImageStyle}
                source={{
                    uri: item.image,
                }}
              />
              <SearchResultButton 
              click={() => props.navigation.navigate("Profile", {uid:item.id})}
              textButton={item.name}
                />
          </View>
        )}
    />

        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
      backgroundColor: '#ffffff',
      height:"100%",
    },
    containerInfo:{
marginTop:40
    },
    containerImage:{
      borderStyle:"solid",
      borderWidth:1,
      borderRadius:20,
      margin:10,
      borderColor:"#000000"
    },
    ImageStyle: {
      backgroundColor: '#ffffff',
      height: 50,
      width: 50,
      borderStyle:"solid",
      borderWidth:1,
      borderRadius:50,
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop:20,
  },
  });


  const mapStateToProps = (store) => ({
    allUsers: store.userState.allUsers,
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    userFollowingLoaded: store.usersState.userFollowingLoaded,
    allPosts: store.userState.allPosts,
})
export default connect(mapStateToProps, null)(Search);
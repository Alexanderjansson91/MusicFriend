import React, { useState, useEffect } from 'react'
import firebase from 'firebase';
require('firebase/firestore');
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux'

//Modal how display all your friends
const Friends = ({
  modalOpen,
  onClose,
  costumerImage,
  nextPage,
  closeFriends,
  props
}) => {

    const [following, setFollowers] = useState([]);



  return (
    <Modal  style={styles.modal} visible={modalOpen} animationType="slide">
              <TouchableOpacity style={styles.returnButtonView} onPress={onClose}>
          <View>
            <Text style={styles.textButtons}>{closeFriends}</Text>
          </View>
        </TouchableOpacity>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={following}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Text style={styles.container}>{item.uid}</Text>
                         
                            <TouchableOpacity
                            onPress={() => props.navigation.navigate("Profile", {uid: item.user.uid})}
                            >   
                            <Text>{item.user.name}</Text>
                            </TouchableOpacity>
                            
                        </View>
                    )}
                />
    </Modal>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
  allPosts: store.userState.allPosts,
})
export default connect(mapStateToProps, null)(Friends);

//Style for Image Modal
const styles = StyleSheet.create({

  modal:{
    height:"50%",
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textButtons: {
    color: '#10DDE5',
    fontSize: 20,
  },
  returnButtonView: {
    fontSize: 20,
    marginTop: 50,
    marginLeft: 20,
    color: '#ffffff',
    flexDirection: 'row',
  },
  space: {
    marginBottom: 20,
  },
  nextPageButtonView: {
    fontSize: 20,
    marginTop: 50,
    marginRight: 20,
    color: '#ffffff',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  imageView: {
    marginTop: 5,
  },
  image: {
    aspectRatio: 1 / 1,
  },
});
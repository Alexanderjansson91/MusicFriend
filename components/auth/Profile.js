import React from 'react'
import {View, Text, Button} from 'react-native'
import { connect } from 'react-redux';
import firebase from 'firebase'

function Profile(props) {

    const { currentUser, posts } = props;
    const onLogout = () => {
        firebase.auth().signOut();
    };

    return (
        <View>
            <Text>Profile</Text>
            <Button
                    style={{marginTop:30}}
                    title="Log out"
                    onPress={() => onLogout()}
                />
                <Text>{currentUser.name}</Text>
        </View>
    )
}

//Access the store states from redux
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
  });
  
  export default connect(mapStateToProps, null)(Profile);

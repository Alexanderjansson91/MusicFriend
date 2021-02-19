import React, { Component } from 'react'
import { Text, View, Button } from 'react-native';
import firebase from 'firebase'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../../redux/actions/index'

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {

        const onLogout = () => {
            firebase.auth().signOut();
          };

        const {currentUser} = this.props;
       
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>{currentUser.name} User is logged in</Text>
                <Button
                    title="Log out"
                    onPress={() => onLogout()}
                />
            </View>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

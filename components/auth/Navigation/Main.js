import React, { Component } from 'react'
import { Text, View, Button } from 'react-native';
import firebase from 'firebase'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from '../Feed'
import ProfileScreen from '../Profile'


import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../../redux/actions/index'


const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {

    const onLogout = () => {
        firebase.auth().signOut();
    };

        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen 
                name="Feed"
                 
                component={FeedScreen}
                options ={{
                    tabBarIcon:({color, size}) =>(
                        <Icon name="planet-outline" size={16} color={color} size={26} />
                    )
                }}
                />
                <Tab.Screen 
                listeners={({navigation})=> ({
                    tabPress: event =>{
                        event.preventDefault()
                        navigation.navigate("Add")
                    }
                })}
                name="AddContainer" 
                component={EmptyScreen}
                options ={{
                    tabBarIcon:({color, size}) =>(
                        <Icon name="add-circle-outline" size={16} color={color} size={26} />
                    )
                }}
                />
                <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options ={{
                    tabBarIcon:({color, size}) =>(
                        <Icon name="person-circle-outline" size={16} color={color} size={26} />
                    )
                }}
                />
          </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

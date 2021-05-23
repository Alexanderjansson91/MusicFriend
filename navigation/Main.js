import React, { Component } from 'react'
import { Text, View, Button } from 'react-native';
import firebase from 'firebase'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from '../screens//Feed'
import ProfileScreen from '../screens/Profile'
import SearchScreen from '../screens/Search'
import Icon from 'react-native-vector-icons/Ionicons';


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, clearData, fetchUserSongs,fetchAllUsers, fetchUsers  } from '../redux/actions/index'


const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
  return null;
};

//Tab navigation component
export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.clearData();
    this.props.fetchUserSongs();
    this.props.fetchAllUsers();
    this.props.fetchUsers();
  }

  //Tab bar navigation
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        labeled={false}
        barStyle={{ backgroundColor: '#000000' }}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="planet-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="people-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          name="AddContainer"
          component={EmptyScreen}
          options={{
            tabBarIcon:({color, size}) =>(
              <Icon name="add-circle-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-circle-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

//Access the store states from redux
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

//Bind the components to redux
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
      fetchUserPosts,
      clearData,
      fetchUserSongs,
      fetchAllUsers,
      fetchUsers,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

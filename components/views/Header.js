import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

//Header View
const Header = (props) => {
  const { logoContainer, viewContainer } = styles;
  return (
    <View style={viewContainer}>
      <View style={styles.parent}>
        <Text style={logoContainer}>{props.headerText}</Text>
        <TouchableOpacity style={styles.profilContainer} onPress={props.click}>
          <View>
            <Icon
              name={props.icon}
              size={16} color="#ffffff" size={26} 
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Style for header
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#000000',
    height: 150,
  },
  iconStyles: {
    marginRight: 10,
    right: 0,
    position: 'absolute',
    color: 'white',
    fontSize: 25,
    marginTop: '1%',
  },
  logoContainer: {
    fontSize: 20,
    marginTop: 50,
    marginLeft: 20,
    color: '#10DDE5',
    flexDirection: 'row',
  },
  profilContainer: {
    fontSize: 20,
    marginTop: 50,
    marginRight: 20,
    color: '#ffffff',
    marginBottom: 40,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  parent: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Header;
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

//Header View
const Header = (props) => {
  const { logoContainer, viewContainer } = styles;

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }  

  return (
    <View style={viewContainer}>
      <View style={styles.parent}>
        <Text style={logoContainer}>{props.headerText}</Text>
        <TouchableOpacity style={styles.profilContainer} onPress={props.click}>
          <View>
            <Icon
            style={styles.iconStyles}
              name={props.icon}
               
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
    backgroundColor: '#ffffff',
    height: 120,
    borderStyle:'solid',
    borderColor:'#000000',
    borderBottomWidth:1
  },
  iconStyles: {
   
    fontSize: 28,
    marginTop: 10, 
 
    color:"#000000",
    zIndex:999,
    
  },
  logoContainer: {
    fontSize: 30,
    marginTop: 55,
    marginLeft: 20,
    color: '#10DDE5',
    flexDirection: 'row',
    fontFamily: 'Inter_900Black'
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
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { SearchBar } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


//Header View for the feed with an collpase include searchbar
const HeaderFeed = (props) => {
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
          <Collapse>
            <CollapseHeader>
              <View style={styles.collapseContainer}>
                <Icon style={styles.iconStyles} name={props.icon} />
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Collapse>
                <CollapseHeader>
                  <TextInput
                    style={styles.searchBar}
                    round
                    placeholderTextColor="#000000"
                    searchIcon={{ size: 24 }}
                    placeholder="Sök län"
                    value={props.search}
                    onChangeText={props.searchFunction}
                    onClear={props.clear}
                  />
                </CollapseHeader>
              </Collapse>
            </CollapseBody>
          </Collapse>
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
    borderStyle: 'solid',
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
  collapseContainer: {
    position: 'relative',
    right: 0,
  },
  collapse: {
    width: 300,
  },
  searchBar: {
    width: 150,
    backgroundColor:'#ffffff',
    borderColor:'#10DDE5',
    borderStyle:'solid',
    borderBottomWidth: 2,
    marginTop: 1,
    color:'#000000',
    height: 20,
  },
  iconStyles: {
    fontSize: 26,
    marginTop: 10,
    color:"#000000",
    zIndex: 999,
  },
  logoContainer: {
    fontSize: 30,
    marginTop: 55,
    marginLeft: 20,
    color: '#10DDE5',
    flexDirection: 'row',
    fontFamily:'Inter_900Black',
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
  collapseText: {
    color: "#ffffff",
  },
});

export default HeaderFeed;

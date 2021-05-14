import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//My read more button
const AddButton = (props) => {
  const { viewContainer, parent } = styles;
  return (
    <View style={viewContainer}>
      <View style={parent}>
        <TouchableOpacity style={styles.buttonContainer} onPress={props.click}>
          <View style={styles.buttonView}>
            <Text style={styles.textButton}>{props.textButton}</Text>
            <Icon
              name={props.iconSave}
              size={16} color="#10DDE5" size={26} 
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Styles for my header
const styles = StyleSheet.create({
  viewContainer: {

  },
  buttonContainer: {
    padding:20,
    width:'95%',  
    borderWidth:1,
    borderRadius:20,
    borderStyle:'solid',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor:"#000000",
    marginTop:40,
    marginBottom:40,
  },
  buttonView: { 
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
 
    margin: -10,
    flexDirection:'row'
  },
  textButton: {
    color: '#10DDE5',
    fontWeight: '500',
    fontSize: 18,
    marginRight:10,
  },
});

export default AddButton;
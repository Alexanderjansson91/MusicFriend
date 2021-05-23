import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//View whit the rounded corner under the Header
const CurvedView = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>{props.Textinfo}</Text>
    </View>
  );
};

//Style for the view
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 50,
    marginTop: -50,
  },
});

export default CurvedView;

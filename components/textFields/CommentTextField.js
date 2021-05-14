import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


//Email Textfield for sign in
const CommentTextField = (props) => {
    const { viewContainer, textInput, parent } = styles;
    return (

        <View style={viewContainer}>

            <View style={parent}>
                <TextInput
                    placeholder={props.placeHolder}
                    onChangeText={props.onChange}
                    style={textInput}
                />
            <TouchableOpacity style={styles.buttonContainer} onPress={props.click}>
                    <View style={styles.buttonView}>
                        <Text style={styles.textButton}>{props.textButton}</Text>
                        <Icon
                            name={props.iconSendComment}
                            size={16} color="#10DDE5" size={26}
                        />
                    </View>
                </TouchableOpacity>
                </View>
        </View>

    );
};

//Style for Email Textfield
const styles = StyleSheet.create({
    
    viewContainer: {
        backgroundColor: '#ffffff',
        height: 45,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#10DDE5',
        width: 370,
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom:30,
    },
    parent: {
        flexDirection: 'row',     
    },
    textInput: {
        paddingTop: 10,
        paddingBottom: 6,
        paddingLeft: 6,
        alignItems: 'center',
        fontWeight: '600',
        color: 'black',
        fontSize: 17,
    },
    buttonContainer: {
        padding:10,
        width:'12%',  
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        position:'absolute',
        right:0, 
      },
      buttonView: { 
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop:"1%",
        marginRight:10,
        margin: -10,
        flexDirection:'row'
      },
      textButton: {
        color: '#10DDE5',
        fontWeight: '500',
        fontSize: 18,     
      },
});

export default CommentTextField;
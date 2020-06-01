import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import * as firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCNZpZqclLipXzpQVELS-Q4BM3HSSxC6zQ",
    authDomain: "myproject-d36ff.firebaseapp.com",
    databaseURL: "https://myproject-d36ff.firebaseio.com",
    projectId: "myproject-d36ff",
    storageBucket: "myproject-d36ff.appspot.com",
    messagingSenderId: "1000055141805",
    appId: "1:1000055141805:web:20fb9b41147af32b399d24"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}






export default class about extends React.Component {
    signOutUser = () => firebase.auth().signOut().then(() => {
        this.props.navigation.navigate('Login')
    }).catch(function (error) {
        alert(error)
        return error;
    });;




    render() {
        return (

            <KeyboardAvoidingView behavior="padding" style={styles.container} >
               <View><Text style={{textAlign:"center",marginTop:150}}>About</Text></View>
                <TouchableOpacity onPress={() => this.signOutUser()} style={styles.buttonContainer1}>
                    <Text style={styles.buttonText1}>Log Out</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView >
        )
    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    logo: {

        width: 320,
        height: 150,
    },
    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center"

    },
    title: {
        color: 'white',
        textAlign: "center",
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5
    },
    buttonContainer: {
        width: wp('30%'),
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "center",
        color:'#2cbab2'

    },
    buttonText: {
        textAlign: "center",
        color: 'black',
        opacity: 1,
    }
    ,
    buttonContainer1: {
        borderRadius: 5,
        color:'#2cbab2',
        paddingVertical: 10,
        width: wp('65%'),
        alignSelf: "center"
    },
    buttonText1: {

        fontSize: 15,
        textAlign: "center",
        color: 'white'
    },
    inputtext: {
        height: 40,
        padding: 5,
        fontSize: 20,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginLeft: 60,
        marginRight: 60,

    },
    modalToggle: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: "black",
        opacity: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',


    },
    innerContainer: {
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,

    },
     buttonContainer1: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        top:400,
        left:140,
        right:0,
        width:100
    },

});

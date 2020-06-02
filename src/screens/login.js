import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Modal, TouchableWithoutFeedback,Keyboard, ActivityIndicator} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from "react";
import * as firebase from 'firebase'
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';





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

export default class login extends React.Component {
    state = {
        assetsLoaded: false,
    };
    async componentDidMount() {
        await Font.loadAsync({

            'opensans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
            'opensans-light': require('../../assets/fonts/OpenSans-Light.ttf'),
            'opensans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),


        });
        this.setState({ assetsLoaded: true });
    }
    constructor(props) {
        super(props)
        this.state = ({
            email: '',
            password: ''
        }),
        this.state =({
            isVisible:false
        })
    }

    signinUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.navigation.navigate('HomeStack')
        }).catch(() => {
            if (this.state.email.length == 0 && this.state.password.length == 0) {
                alert("Please enter your email and password")
                return
            }
            else if (this.state.email.length == 0) {
                alert("Please enter your email")
                return
            }
            else if (this.state.password.length == 0) {
                alert("Please enter your password")
                return
            }
            alert("Authentication Error Wrong E-mail or Password")
        }
        )
    }

    render() {
        const { assetsLoaded } = this.state;    
        if(assetsLoaded){
        return (

            <KeyboardAvoidingView behavior="padding" style={styles.container} >
                <Modal visible={this.state.isVisible} animationType='slide' transparent={true} >
                
                <View  style={{height:hp('50%'),
        justifyContent: 'center',position:'absolute',top:160,opacity:0.9}}>
                
                  <View style={styles.modalToggle}>
                 
                  <MaterialIcons style={{color:"white",alignItems:"center",}}
                    name="close"
                    size={20}
                    onPress = {() => {this.setState({ isVisible: false})}}
                 />
                <Text style={{color:'white',
                marginTop:15,
                textAlign:"center",
                fontWeight:"bold",
                fontSize:20}
                }>
                    What is Fin AI?
                </Text>
                <Text style={{color:'white',
                marginTop:60,
                fontWeight:"bold",
                fontSize:17}}>
                Fin AI is an abbreviaton of Finance on Artificial Intelligence.We are creating machine learning models to see the effects of AI in finance markets.You can try our models.
                </Text>
                
                
                  </View>
          
            
              </View>
            </Modal>
                <View style={{
                    backgroundColor: 'white',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: hp('40%')
                }}>
                    <Image style={{
                        flex: 0.8,
                        marginTop:hp('10%'),
                        resizeMode: 'contain',
                    }} source={require('../img/finai.jpg')} />
                </View>
                <LinearGradient style={{height:hp('70%')}}colors={['rgba(255,255,255,1)','rgba(240,240,240,1)', 'rgba(180,180,180,1)', 'rgba(102,102,102,1)']} locations={[0,0.10,0.50,1]}>
                    <View>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ paddingTop: 50 }}>
                            
                            <TextInput placeholder=" E-mail" placeholderTextColor='rgba(120,125,135,0.9)'

                                returnKeyType={"next"} keyboardType="email-address"
                                autoCorrect={false} blurOnSubmit={false}
                                onSubmitEditing={() => { this.password.focus(); }}
                                style={styles.inputtext}
                                onChangeText={(email) => this.setState({ email })}
                            >

                            </TextInput>
                            
                            <TextInput placeholder="Password"  placeholderTextColor='rgba(120,125,135,0.9)'
                                secureTextEntry
                                ref={ref => this.password = ref}
                                style={styles.inputtext}
                                returnKeyType={"go"}
                                onChangeText={(password) => this.setState({ password })}
                            >

                            </TextInput>
                            
                            <TouchableOpacity onPress={() => this.signinUser(this.state.email, this.state.password)} style={styles.buttonContainer1}>
                                <Text style={styles.buttonText1}>Login</Text>
                            </TouchableOpacity>
                        </View >
                        </TouchableWithoutFeedback>   
                    </View>
                    <Text style={styles.title} >Haven't signed yet ?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Sign')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Register Now!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ isVisible: true }) }} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>About Us</Text>
                    </TouchableOpacity>
                
                    </LinearGradient>
            </KeyboardAvoidingView >
        )}
        else{
            return(<View><ActivityIndicator></ActivityIndicator></View>)
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',

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
        fontFamily: 'opensans-light',
        color: 'white',
        textAlign: "center",
        fontSize: 18,
        marginTop:20,
        marginBottom:5
    },
    buttonContainer: {
        width:wp('30%'),
        marginBottom:10,
        marginTop:10,
        alignSelf:"center",

    },
    buttonText: {
        fontFamily: 'opensans-bold',
        textAlign: "center",
        color: 'black',
        opacity: 1,
    }
    ,
    buttonContainer1: {
        borderRadius:5,
        backgroundColor: '#2cbab2',
        paddingVertical: 10,
        width:wp('65%'),
        alignSelf:"center"
    },
    buttonText1: {
        fontFamily: 'opensans-bold',

        fontSize:25,
        textAlign: "center",
        color: 'white'
    },
    inputtext: {
        height: 40,
        padding:5,
        fontSize:20,
        borderRadius:5,
        borderBottomWidth:1,
        borderBottomColor:'black',
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginLeft: 60,
        marginRight: 60,

    },
    modalToggle: {
        flex:1,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor:"black",
        opacity:1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        
        
        
      },
      innerContainer: {
        alignItems: 'center',
      },
      backgroundImage:{
        flex:1,
        
    },

});

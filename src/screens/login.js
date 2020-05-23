import * as React from 'react';
import {View , Text, TextInput, Image, StyleSheet,TouchableOpacity,KeyboardAvoidingView,Modal} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons'
import {useState }from "react";
import * as firebase from 'firebase'



 const firebaseConfig={
    apiKey: "AIzaSyCNZpZqclLipXzpQVELS-Q4BM3HSSxC6zQ",
    authDomain: "myproject-d36ff.firebaseapp.com",
    databaseURL: "https://myproject-d36ff.firebaseio.com",
    projectId: "myproject-d36ff",
    storageBucket: "myproject-d36ff.appspot.com",
    messagingSenderId: "1000055141805",
    appId: "1:1000055141805:web:20fb9b41147af32b399d24"
};
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}           

export default class login extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            email:'',
            password:''
        })
    }
    
    signinUser=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            this.props.navigation.navigate('Welcome') 
        }).catch(()=>{
            if(this.state.email.length==0 && this.state.password.length==0){
                alert("Please enter your email and password")
                return
            }
            else if(this.state.email.length==0){
                alert("Please enter your email")
                return
            }
            else if(this.state.password.length==0){
                alert("Please enter your password")
                return
            }
            alert("Authentication Error Wrong E-mail or Password")
            }
        )}
        
    state = {
        isVisible: false, //state of modal default false
      }
    render(){
        
        return (
            
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Modal style={{backgroundColor:'rgba(0,0,0,0.5)'}} visible={this.state.isVisible} animationType='slide' transparent={true}>
                    <View style={{borderTopLeftRadius: 10,
              borderTopRightRadius: 10,borderRadius:2,borderColor:"white",overflow:'hidden',marginLeft:40,marginRight:40,height:500, backgroundColor:'#3498db'}}>
                    <MaterialIcons style={styles.modalToggle}
                        name="close"
                        size={20}
                        onPress = {() => {this.setState({ isVisible: false})}}
                    />
                    <Text style={{color:'black',
                    marginTop:50,
                    textAlign:"center",
                    fontWeight:"bold",
                    fontSize:20}
                    }>
                        What is Fin AI?
                    </Text>
                    <Text style={{color:'white',
                    marginTop:80,
                    fontWeight:"bold",
                    fontSize:15}}>
                    Fin AI is an abbreviaton of Finance on Artificial Intelligence.We are creating machine learning models to see the effects of AI in finance markets.You can try our models.
                    </Text>
                    </View>

                </Modal>
                <View style={{
                       flexDirection: "row",
                       alignItems: "center",
                       justifyContent:"center",
                       marginTop:50
                        }}>
                <Text style={styles.title
                    }>Welcome to the  </Text>
                <Image source={require('../img/finai.jpg')}/>
                </View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../img/bgg.png')}/>
                </View>
                
                <View >
                <TextInput  placeholder=" E-mail" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType = {"next"} keyboardType="email-address" 
                autoCorrect={false} blurOnSubmit={false}
                onSubmitEditing={() => { this.password.focus(); }}
                style={styles.inputtext}
                onChangeText={(email) => this.setState({email})}
                >

                </TextInput>
                <TextInput placeholder="Password" placeholderTextColor="rgba(255,255,255,0.5)" 
                secureTextEntry
                ref = {ref => this.password = ref}
                style={styles.inputtext}
                returnKeyType={"go"}
                onChangeText={(password)=> this.setState({password})}
                >
                    
                </TextInput>
                    <TouchableOpacity onPress={()=>this.signinUser(this.state.email,this.state.password)} style={styles.buttonContainer1}>
                    <Text style={styles.buttonText1}>Login</Text>
                </TouchableOpacity>
                </View >
                
                <Text style={styles.title} >Haven't signed yet ?</Text><TouchableOpacity onPress={()=>this.props.navigation.navigate('Sign')} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Register Now!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {this.setState({ isVisible: true})}} style={styles.buttonContainer}><Text style={styles.buttonText}>About Us</Text></TouchableOpacity>
               
                
            </KeyboardAvoidingView >
        )
    }}

const styles = StyleSheet.create({
   
    container : {
        flex :1 ,
        backgroundColor: '#3498db',
        
    },
    logo:{
        
        width:320,
        height:150,
    },
    logoContainer:{
            alignItems:"center",
            flexGrow:1,
            justifyContent:"center"
            
    },
    title:{
        color:'white',
        textAlign:"center",
        fontWeight:"bold",
        fontSize:18
    },
    buttonContainer:{
        
        paddingVertical:10,
        
        marginLeft:60,
        marginRight:60,
    },
    buttonText:{
        textAlign:"center",
        color:'white',
        fontWeight:"bold",
        opacity:1,
    }
    ,
    buttonContainer1:{
        backgroundColor:'#2980b9',
        paddingVertical:10,
        
        marginLeft:60,
        marginRight:60,
    },
    buttonText1:{
        textAlign:"center",
        color:'white'
    },
    inputtext:{
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom:20,
        marginLeft:60,
        marginRight:60,
        
    },
    modalToggle:{
        marginBottom:10,
        marginTop:20,
        borderWidth:1,
        borderColor:'#f2f2f2',
        padding:10,
        borderRadius:10,
        alignSelf:"center"
    }
    
});

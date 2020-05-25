import * as React from 'react';
import {View , Text, TextInput, Image, StyleSheet,TouchableOpacity,KeyboardAvoidingView,Modal,ImageBackground} from 'react-native';
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

export default class login2 extends React.Component{
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
                
                <Modal visible={this.state.isVisible} animationType='slide' transparent={true}>
                
                    <View  style={{borderRadius:2,borderWidth:3,borderColor:"white",borderTopLeftRadius: 10,
              borderTopRightRadius: 10,overflow:'hidden',}}>
                  <ImageBackground style={styles.backgroundImage} source={require('../img/background.jpg')}>
                      <View style={{marginTop:40, marginLeft:40,marginRight:40,height:800, }}>
                      <MaterialIcons style={styles.modalToggle}
                        name="close"
                        size={20}
                        onPress = {() => {this.setState({ isVisible: false})}}
                    />
                    <Text style={{color:'white',
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
                  </ImageBackground>
                    
                  </View>
                </Modal>
                <View style={styles.logoContainer}>
                  <View style={{
                       flexDirection: "row",
                       alignItems: "center",
                       justifyContent:"center",
                       marginBottom:20,
                       marginTop:20,
                        }}>
                   <Text style={styles.title
                    }>Welcome to the  </Text>
                   <Image source={require('../img/finai.jpg')}/>
                   </View>
                   <ImageBackground style={styles.backgroundImage} source={require('../img/background.jpg')}>
                      <Image style={styles.logo} source={require('../img/bgg.png')}/>
                        <View>
                          <TextInput  placeholder=" E-mail" placeholderTextColor="white" 
                returnKeyType = {"next"} keyboardType="email-address" 
                autoCorrect={false} blurOnSubmit={false}
                onSubmitEditing={() => { this.password.focus(); }}
                style={styles.inputtext}
                onChangeText={(email) => this.setState({email})}
                >

                          </TextInput>
                          <TextInput placeholder="Password" placeholderTextColor="white" 
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
                </View>
                </ImageBackground>
                <Text style={styles.title} >Haven't signed yet ?</Text><TouchableOpacity onPress={()=>this.props.navigation.navigate('Sign')} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Register Now!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {this.setState({ isVisible: true})}} style={styles.buttonContainer}><Text style={styles.buttonText}>About Us</Text></TouchableOpacity>
                </View>  
            </KeyboardAvoidingView >
        )
    }}

const styles = StyleSheet.create({
   
    container : {
        flex :1 ,
        backgroundColor: 'black',
        
    },
    logo:{
        marginLeft:40,
        width:320,
        height:150,
    },
    logoContainer:{
            alignItems:"center",
            flexGrow:1,
            justifyContent:"center",
           
            
    },
    title:{
        color:'white',
        textAlign:"center",
        fontWeight:"bold",
        fontSize:18,
        marginTop:10,
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
        opacity:0.5,
        paddingVertical:10,
        marginLeft:60,
        marginRight:60,
        borderRadius:10,
        borderWidth:1,
        borderColor:'white'
    },
    buttonText1:{
        textAlign:"center",
        color:'#ffffff'
    },
    inputtext:{
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginTop:20,
        marginBottom:20,
        marginLeft:60,
        marginRight:60,
        color:'white'
        
        
        
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    modalToggle:{
        marginBottom:10,
        marginTop:20,
        borderWidth:1,
        borderColor:'#f2f2f2',
        padding:10,
        borderRadius:10,
        alignSelf:"center",
        color:"white",
        fontWeight:"bold"
    },
    backgroundImage:{
        width:420,
        height:400,
 
    }

    
});

import * as React from 'react';
import {View , Text, Image, StyleSheet,TouchableOpacity,KeyboardAvoidingView,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';
import SignForm from './signform';
import * as firebase from 'firebase'
import { render } from 'react-dom';

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

const pressHandler = () =>{
        navigation.navigate('Welcome')}
    const goBack = () =>{
            navigation.navigate('webview')}
export default class sign extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            email:'',
            password:'',
            name:'',
            surname:'',
            username:'',
        })
    }
    signupUser=(email,password)=>{
        try {
            if(this.state.password.length<10){
                alert("Please enter at least 10 characters")
                return
            }
            firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
                this.props.navigation.navigate('Login')
                
            })
            
        } catch (error) {
            console.log(error.toString())
        }

    }
    
    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={{
                       flexDirection: "row",
                       alignItems: "center",
                       justifyContent:"center",
                       marginTop:50
                        }}>
                <Text style={styles.title
                    }>Welcome to the  </Text>
                <Image style={{
                       
                       marginTop:50
                        }} source={require('../img/finai.jpg')}/>
                
                </View>
                <View style={{
                       marginTop:100
                        }}>
                
                {/* <TextInput placeholder="Name" placeholderTextColor="rgba(255,255,255,0.5)"
                 returnKeyType={"next"} blurOnSubmit={false}
                 onSubmitEditing={() => { this.Surname.focus(); }}
                 autoCorrect={false} 
                 onChangeText={(name)=> this.setState({name})} 
                 style={styles.input}/>
                <TextInput placeholder="Surname" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType={"next"} ref = {ref => this.Surname = ref}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.Username.focus(); }}
                autoCorrect={false}
                onChangeText={(surname)=> this.setState({surname})} 
                style={styles.input}/>
                <TextInput placeholder="Username" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType={"next"} ref = {ref => this.Username = ref}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.email.focus(); }}
                autoCorrect={false}  
                onChangeText={(username)=> this.setState({username})} 
                style={styles.input}/> */}
                <TextInput placeholder="E-mail" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType={"next"} ref = {ref => this.email = ref}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.Password.focus(); }}
                keyboardType="email-address" autoCorrect={false} 
                onChangeText={(email)=> this.setState({email})} 
                style={styles.input}/>
                <TextInput placeholder="Password" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType={"go"}
                ref = {ref => this.Password = ref}
                secureTextEntry  
                onChangeText={(password)=> this.setState({password})} 
                style={styles.input}/>
                <TouchableOpacity onPress={()=> this.signupUser(this.state.email,this.state.password)} 
                 style={styles.buttonContainer1}>
                <Text style={styles.buttonText1}>Sign Up</Text>
                </TouchableOpacity>
                </View >
                <TouchableOpacity rounded onPress={()=>this.props.navigation.navigate('Login')} style={styles.buttonContainer}>
                    <Text style={styles.buttonText1}>Go Back</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView >
        )
    }
    
            
        
    }

const styles = StyleSheet.create({
    input:{
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom:20,
        marginLeft:60,
        marginRight:60,
        marginTop:20,
        
    
    },
    container : {
        flex :1 ,
        backgroundColor: '#3498db',
    },
    logo:{
        width:10,
        

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
        marginTop:50

    },
    buttonContainer:{
        
        paddingVertical:10,
        marginTop:40,
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
    }
});

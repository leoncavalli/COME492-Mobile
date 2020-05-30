import * as React from 'react';
import {View , Text, Image, StyleSheet,TouchableOpacity,KeyboardAvoidingView,TextInput,ImageBackground} from 'react-native';
import {StackNavigator} from 'react-navigation';
import * as firebase from 'firebase'
import { render } from 'react-dom';
import { LinearGradient } from 'expo-linear-gradient';
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
            if(this.state.email.length==0 && this.state.password==0){
                alert("Please enter an email and password")
                return
            }
            else if(this.state.email.length==0){
                alert("Please enter an email")
                return
            }
            else if(this.state.password.length==0){
                alert("Please enter a passsword")
                return
            }
            else if(this.state.password.length<10){
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
                
                <View style={{
                    backgroundColor: 'white',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: '40%'
                }}>
                    <Image style={{
                        flex: 0.7,
                        resizeMode: 'contain',
                    }} source={require('../img/finai.jpg')} />
                </View>
                <LinearGradient style={{height:'60%'}}colors={['rgba(255,255,255,1)', 'rgba(246,246,246,1)', 'rgba(102,102,102,1)']} locations={[0,0.10,1]}>
                <View>
                        <View style={{ paddingTop: 50 }}>
                        <TextInput placeholder="E-mail" placeholderTextColor="rgba(155,155,155,0.9)" 
                         returnKeyType={"next"} ref = {ref => this.email = ref}
                         blurOnSubmit={false}
                         onSubmitEditing={() => { this.Password.focus(); }}
                        keyboardType="email-address" autoCorrect={false} 
                          onChangeText={(email)=> this.setState({email})} 
                          style={styles.input}/>
                      <TextInput placeholder="Password" placeholderTextColor="rgba(155,155,155,0.9)" 
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
                    </View>
               
                <TouchableOpacity rounded onPress={()=>this.props.navigation.navigate('tradeRobot')} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                </LinearGradient>
                
                
            </KeyboardAvoidingView >
        )
    }
    
            
        
    }

const styles = StyleSheet.create({
    input: {
        height: 40,
        padding:5,
        fontSize:20,
        borderRadius:5,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 20,
        marginLeft: 60,
        marginRight: 60,

    },
    container : {
        flex :1 ,
        backgroundColor: 'black',
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
        fontSize:18,
        marginTop:10,
    },
    buttonContainer:{
        color:"white",
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        
    },
    buttonText:{
        textAlign:"center",
        color:'black',
        fontWeight:"bold",
        opacity:1,
    }
    ,
    buttonContainer1: {
        borderRadius:5,
        backgroundColor: '#2cbab2',
        paddingVertical: 10,

        marginLeft: 60,
        marginRight: 60,
    },
    buttonText1: {
        textAlign: "center",
        color: 'white'
    },
    backgroundImage:{
        width:420,
        height:400,
 
    }
});

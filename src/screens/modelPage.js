import * as React from 'react';
import {View , Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet,Image, ImageBackground } from 'react-native';
import {StackNavigator} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../shared/card'
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

export default class welcome extends React.Component {
    signOutUser = () => firebase.auth().signOut().then(()=>{
        this.props.navigation.navigate('Login') 
    }).catch(function(error) {
        alert(error)
        return error;
      });;
    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
            <ImageBackground style={styles.backgroundImage} source={require('../img/bg-signup.jpg')}>
            <View>
        <Text style={styles.Header}>Welcome{'\n'}{this.props.navigation.getParam('name')}</Text>
                        <Text style={styles.Header}>Select Your Forecast Method</Text>
                
            </View>
            <View style={{
                       flexDirection: "row",
                       
                        }}>
            
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ArimaModel')}  style={styles.buttonContainer}>
                    <Card><Text style={styles.touchableText}>ARIMA
                    
                    </Text>
                    <Text style={styles.insideText}>ARIMA stands for ‘Auto Regressive Integrated Moving Average’ is used to forecast future values.</Text>
                   
                    </Card>
                    
                </TouchableOpacity>
                <Image style={styles.cardimage} source={require('../img/ext.jpg')}/>
            </View>
            <View style={{
                       flexDirection: "row",
                       
                        }} >   
               <Image style={styles.cardimage} source={require('../img/ext2.jpg')}/> 
                <TouchableOpacity  style={styles.buttonContainer}  onPress={() => this.props.navigation.navigate('lstmModel')}  >
                    <Card><Text style={styles.touchableText}>LSTM</Text>
                    <Text style={styles.insideText}>Long short-term memory (LSTM) is an artificial recurrent neural network (RNN) architecture used  forecast future values</Text>
                    </Card>
                         
                 </TouchableOpacity>
                 
            </View>
            <TouchableOpacity onPress = {() => this.signOutUser()} style={styles.signoutContainer}><Text style={styles.buttonText}>Sign Out</Text></TouchableOpacity>
            </ImageBackground>
            </KeyboardAvoidingView> 

                
            

        )
    }
        
            
    }

const styles = StyleSheet.create({

    container : {
        flex :1 ,
    },
    Header :{
        marginTop:40,
        marginLeft:60,
        marginRight:60,
        textAlign:"center",
        fontSize:15,
        fontWeight:'bold',
        color:'white'

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
        fontWeight:"bold"
    },
    buttonContainer:{
        paddingVertical:10,
        marginTop:30,
       
      
    },
    signoutContainer:{
        paddingVertical:10,
        marginTop:100,
    },
    touchableText:{
        textAlign:"center",
        color:'white',
        fontWeight:"bold",
        opacity:1,
        marginTop:5,
        
    },
    buttonText:{
        textAlign:"center",
        color:'white',
        fontWeight:"bold",
        opacity:1,
        
    },
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
    cardimage:{
        height: hp('15%'),
        width: wp('50%'),
        marginTop:40,
        borderRadius:6,
        shadowOffset:{width:5,height:5},
        shadowColor:'#8cf1f5',
        shadowOpacity:0.2,
    },
    backgroundImage:{
        flex:1,
        resizeMode:"cover"
    },
    insideText:{
        color:'white',
        fontWeight:"bold",
        opacity:1,
        marginTop:3,
        marginLeft:10,
        fontSize:12,
    }
});

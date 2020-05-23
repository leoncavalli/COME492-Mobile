import * as React from 'react';
import {View , Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Card from '../shared/card'
export default function welcome({navigation}) {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View>
            <Text style={styles.Header}>Welcome {navigation.getParam('name')}</Text>
                <Text style={styles.Header}>Select Your Forecast Method</Text>
                
            </View>
            <View>
            
                <TouchableOpacity  style={styles.buttonContainer}>
                    <Card><Text style={styles.buttonText}>ARIMA</Text></Card>
                    
                </TouchableOpacity>
                
                <TouchableOpacity  style={styles.buttonContainer}>
                    <Card><Text style={styles.buttonText}>LSTM</Text></Card>
                
                 </TouchableOpacity>
            </View>
            </KeyboardAvoidingView> 
                
            

        )
            
    }

const styles = StyleSheet.create({

    container : {
        flex :1 ,
        backgroundColor: '#3498db',
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
        marginTop:100,
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

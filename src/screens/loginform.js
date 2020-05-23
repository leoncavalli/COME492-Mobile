import * as React from 'react';
import {View , Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';


    
 export default function loginForm({ navigation }) {
    

        return (
            <View style={styles.container}>
             
                <TextInput placeholder="Password" placeholderTextColor="rgba(255,255,255,0.5)" secureTextEntry  style={styles.input}>
                    
                </TextInput>
                
            </View>
        )
    }

const styles = StyleSheet.create({
    container:{
        padding :20
    },
    input:{
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom:20,
        marginLeft:60,
        marginRight:60,
    
    }
    
})


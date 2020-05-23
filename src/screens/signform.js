import * as React from 'react';
import {View , Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';


    
 export default function loginForm({ navigation }) {
        
        return (
            <View style={styles.container}>
                <TextInput placeholder="Name" placeholderTextColor="rgba(255,255,255,0.5)"
                 returnKeyType={"next"} blurOnSubmit={false}
                 onSubmitEditing={() => { this.Surname.focus(); }}
                 autoCorrect={false}  style={styles.input}/>
                <TextInput placeholder="Surname" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType={"next"} ref = {ref => this.Surname = ref}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.Username.focus(); }}
                autoCorrect={false}   style={styles.input}/>
                <TextInput placeholder="Username" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType={"next"} ref = {ref => this.Username = ref}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.email.focus(); }}
                autoCorrect={false}  style={styles.input}/>
                <TextInput placeholder="E-mail" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType={"next"} ref = {ref => this.email = ref}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.Password.focus(); }}
                keyboardType="email-address" autoCorrect={false} style={styles.input}/>
                <TextInput placeholder="Password" placeholderTextColor="rgba(255,255,255,0.5)" 
                returnKeyType={"go"}
                ref = {ref => this.Password = ref}
                secureTextEntry  style={styles.input}/>

                
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


import * as React from 'react';
import {View , Text, TextInput, Image, StyleSheet,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {WebView} from 'react-native-webview'
export default class webview extends React.Component{
  
    render(){
      return (
        <WebView
          source={{uri: 'http://10.0.2.2:8000/'}}
          
        />
      );}
      
    }
  
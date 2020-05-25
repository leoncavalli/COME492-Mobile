import * as React from 'react';
import {View , Text, TextInput, Image, StyleSheet,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {WebView} from 'react-native-webview'
export default class webview extends React.Component{
  
    render(){
      return (
        <WebView
          source={{uri: '127.0.0.1:8000/arima/'}}
          
        />
      );}
      
    }
  
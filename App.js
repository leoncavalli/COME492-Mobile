import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login'
import Navigator from './src/router/loginStack'
import { render } from 'react-dom';
export default function App() {
  
     return (
       <Navigator/>
    
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

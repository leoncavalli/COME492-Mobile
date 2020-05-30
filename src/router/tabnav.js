import { createAppContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/login'
import Model from '../screens/modelPage'
import Sign from '../screens/sign'
import web from '../screens/webview'
import ArimaModel from '../screens/arimaModel'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab=createMaterialBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator>
        
        <Tab.Screen name="Model" component={Model} />
        <Tab.Screen name="ArimaModel" component={ArimaModel} />
      </Tab.Navigator>
    );
  }

  export default function TabNav() {
    return(
    <NavigationContainer >
      <MyTabs/>
    </NavigationContainer> 
       );

}

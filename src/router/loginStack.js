import { createAppContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase'
import Home from '../screens/Home'
import Login from '../screens/login'
import Model from '../screens/modelPage'
import Sign from '../screens/sign'
import About from '../screens/about'
import Trader from '../screens/trader'
import ArimaModel from '../screens/arimaModel'
import ArimaResult from '../screens/arimaResult'
import TradeRobott from '../screens/tradeRobot'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import welcome from '../screens/Home';
import { Title } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('../img/finai.jpg')}
                style={{ width: 80, height: 30 }}
            />
        );
    }
}


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function ModelStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ModelPage" component={Model} options={{headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="ArimaModel" component={ArimaModel} options={{headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="ArimaResult" component={ArimaResult} options={{headerTitle: props => <LogoTitle {...props} />}} />
            
        </Stack.Navigator>
    )
}
function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'Model') {
                        iconName = focused ? 'list' : 'list';
                    }
                    else if(route.name==="Trade Robot"){
                        iconName='bolt'
                    }
                    else{
                        iconName='user'
                    }
                    return <FontAwesome5 name={iconName} size={20} color={'#fff'} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Model" component={ModelStackScreen} />
            <Tab.Screen name="Trade Robot" component={TradeRobott} />
            <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
    );
}

function LoginStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Sign" component={Sign} options={{ headerShown: false }} />
            <Stack.Screen name="HomeStack" component={MyTabs} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    )
}




export default function LoginStack() {
    var logged = firebase.auth().currentUser;
    return (
        <NavigationContainer>
            {logged ? (
                <>
                    <MyTabs />

                </>
            ) : (
                    <LoginStackScreen />
                )}
        </NavigationContainer>
    );

}

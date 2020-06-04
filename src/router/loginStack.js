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
import LstmModel from '../screens/lstmModel'
import LstmResult from '../screens/lstmResult'
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

function HomeStackScreen(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerTitle: props => <LogoTitle {...props} />}} />
    </Stack.Navigator>)
}
function TradeStackScreen(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="Trade Robot" component={TradeRobott} options={{headerTitle: props => <LogoTitle {...props} />}} />
    </Stack.Navigator>)
}
function AboutStackScreen(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="About" component={About} options={{headerTitle: props => <LogoTitle {...props} />}} />
    </Stack.Navigator>)
}
function ModelStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ModelPage" component={Model} options={{headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="ArimaModel" component={ArimaModel} options={{headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="ArimaResult" component={ArimaResult} options={{headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="LstmModel" component={LstmModel} options={{headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="LstmResult" component={LstmResult} options={{headerTitle: props => <LogoTitle {...props} />}} />
            
        </Stack.Navigator>
    )
}
function MyTabs() {
    return (
        <Tab.Navigator  
            shifting={false}
            activeColor={'white'}
            barStyle={{backgroundColor:'#64a19d'}}
            

            screenOptions={({ route }) => ({
                
                tabBarIcon: ({focused}) => {
                    let iconName;
                    let color;
                    if (route.name === 'Home') {
                        color= focused ? 'black' :'white';
                        iconName = 'home';
                    } else if (route.name === 'Models') {
                        color= focused ? 'black' :'white';

                        iconName ='chart-bar';
                    }
                    else if(route.name==="Trade Robot"){
                        color= focused ? 'black' :'white';

                        iconName='bolt'
                    }
                    else{
                        color= focused ? 'black' :'white';

                        iconName='user'
                    }
                    return <FontAwesome5 name={iconName} size={22} color={color} />;
                },
            })}
            >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Models" component={ModelStackScreen} />
            <Tab.Screen name="Trade Robot" component={TradeStackScreen} />
            <Tab.Screen name="About" component={AboutStackScreen} />
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

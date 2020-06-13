import { createAppContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase'
import Home from '../screens/Home'
import Login from '../screens/login'
import Model from '../screens/modelPage'
import Sign from '../screens/sign'
import About from '../screens/about'
import ArimaModel from '../screens/arimaModel'
import ArimaResult from '../screens/arimaResult'
import TradeRobott from '../screens/tradeRobot'
import TradeResult from '../screens/tradeResult'
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
        <Stack.Screen name="TradeResult" component={TradeResult} options={{headerTitle: props => <LogoTitle {...props} />}} />

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
            <Stack.Screen name="ArimaModel" component={ArimaModel} options={{headerBackTitleVisible:false,headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="ArimaResult" component={ArimaResult} options={{headerBackTitleVisible:false,headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="LstmModel" component={LstmModel} options={{headerBackTitleVisible:false,headerTitle: props => <LogoTitle {...props} />}} />
            <Stack.Screen name="LstmResult" component={LstmResult} options={{headerBackTitleVisible:false,headerTitle: props => <LogoTitle {...props} />}} />
            
        </Stack.Navigator>
    )
}
function MyTabs() {
    return (
        <Tab.Navigator  
            activeColor={'white'}
            barStyle={{borderRadius:15}}
            

            screenOptions={({ route }) => ({
                
                tabBarIcon: ({focused}) => {
                    let iconName;
                    let color;
                    if (route.name === 'Home') {
                        color= 'white';
                        iconName = 'home';
                    } else if (route.name === 'Models') {
                        color='white';

                        iconName ='chart-bar';
                    }
                    else if(route.name==="Trade Robot"){
                        color='white';

                        iconName='bolt'
                    }
                    else{
                        color='white';

                        iconName='user'
                    }
                    return <FontAwesome5 name={iconName} size={23} color={color} />;
                },
            })}
            >
            <Tab.Screen name="Home" component={HomeStackScreen} options={{tabBarColor:'#A6A6A6'}} />
            <Tab.Screen name="Models" component={ModelStackScreen} options={{tabBarColor:'#2A5B61'}} />
            <Tab.Screen name="Trade Robot" component={TradeStackScreen} options={{tabBarColor:'#FFA500'}}/>
            <Tab.Screen name="About" component={AboutStackScreen} options={{tabBarColor:'#2C93AB'}}/>
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

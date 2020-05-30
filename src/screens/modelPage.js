import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as firebase from 'firebase'
import { Card, Button } from 'react-native-elements'
import * as Font from 'expo-font';
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient';

const firebaseConfig = {
    apiKey: "AIzaSyCNZpZqclLipXzpQVELS-Q4BM3HSSxC6zQ",
    authDomain: "myproject-d36ff.firebaseapp.com",
    databaseURL: "https://myproject-d36ff.firebaseio.com",
    projectId: "myproject-d36ff",
    storageBucket: "myproject-d36ff.appspot.com",
    messagingSenderId: "1000055141805",
    appId: "1:1000055141805:web:20fb9b41147af32b399d24"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class welcome extends React.Component {
    state = {
        assetsLoaded: false,
    };
    async componentDidMount() {
        await Font.loadAsync({

            'opensans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
            'opensans-light': require('../../assets/fonts/OpenSans-Light.ttf'),
            'opensans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),


        });
        this.setState({ assetsLoaded: true });
    }
    signOutUser = () => firebase.auth().signOut().then(() => {
        this.props.navigation.navigate('Login')
    }).catch(function (error) {
        alert(error)
        return error;
    });;
    render() {
        const { assetsLoaded } = this.state;

        if (assetsLoaded) {
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Swiper style={{ marginTop: 25 }} >
                        <View style={{ height: '70%' }} >
                            <View>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    ARIMA</Text></View>
                            <Card image={require('../img/ext.jpg')} imageProps={{ resizeMode: "cover" }} imageStyle={{ height: '50%' }}>
                                <Text style={styles.insideText}>
                                    ARIMA stands for ‘Auto Regressive Integrated Moving Average’ is used to forecast future values.
                                    </Text>
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Button ViewComponent={LinearGradient} // Don't forget this!
                                        linearGradientProps={{
                                            colors: ['#2cbab2', '#64a19d'],
                                            start: { x: 0, y: 0.5 },
                                            end: { x: 1, y: 0.5 },
                                        }} title="Select Model" onPress={() => this.props.navigation.navigate('ArimaModel')} titleStyle={{ fontFamily: 'opensans-bold' }}></Button>
                                </TouchableOpacity>
                            </Card>
                        </View>
                        <View style={{ height: '70%' }} >
                            <View>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    LSTM</Text></View>
                            <Card image={require('../img/ext.jpg')} imageProps={{ resizeMode: "cover" }} imageStyle={{ height: '50%' }}>
                                <Text style={styles.insideText}>
                                    Long short-term memory (LSTM) is an artificial RNN architecture used to forecast future values.</Text>
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Button ViewComponent={LinearGradient} // Don't forget this!
                                        linearGradientProps={{
                                            colors: ['#2cbab2', '#64a19d'],
                                            start: { x: 0, y: 0.5 },
                                            end: { x: 1, y: 0.5 },
                                        }} title="Select Model" onPress={() => this.props.navigation.navigate('ArimaModel')} titleStyle={{ fontFamily: 'opensans-bold' }}></Button>
                                </TouchableOpacity>
                            </Card>
                        </View>
                    </Swiper>

                    {/* <View style={{
                       flexDirection: "row",
                       
                        }} >   
               <Image style={styles.cardimage} source={require('../img/ext2.jpg')}/> 
                <TouchableOpacity  style={styles.buttonContainer}>
                    <Card><Text style={styles.touchableText}>LSTM</Text>
                    <Text style={styles.insideText}>Long short-term memory (LSTM) is an artificial recurrent neural network (RNN) architecture used  forecast future values</Text>
                    </Card>
                         
                 </TouchableOpacity>
                 
            </View> */}
                </KeyboardAvoidingView>
            )
        }
        else {
            return (
                <View><ActivityIndicator></ActivityIndicator></View>)
        }
    }


}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#1D1B26',
        flex: 1,
    },
    Header: {
        marginTop: 40,
        marginLeft: 60,
        marginRight: 60,
        textAlign: "center",
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'

    },
    logo: {
        width: 10,


    },
    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center"
    },
    title: {
        color: 'white',
        textAlign: "center",
        fontWeight: "bold"
    },
    buttonContainer: {
        paddingVertical: 10,
        marginTop: 10,
        width: '100%',
    },
    signoutContainer: {
        paddingVertical: 10,
        marginTop: 100,
    },
    touchableText: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        opacity: 1,
        marginTop: 5,

    },
    buttonText: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        opacity: 1,

    },
    buttonContainer1: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,

        marginLeft: 60,
        marginRight: 60,
    },
    buttonText1: {
        textAlign: "center",
        color: 'white'
    },
    cardimage: {
        height: hp('15%'),
        width: wp('50%'),
        marginTop: 40,
        borderRadius: 6,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#8cf1f5',
        shadowOpacity: 0.2,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover"
    },
    insideText: {
        fontFamily: 'opensans-regular',
        width: '100%',
        textAlign: "center",
        color: 'black',
        opacity: 1,
        marginTop: 3,
        fontSize: 20,
    }
});

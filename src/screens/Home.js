import * as React from 'react';
import { View, Text, TextInput, Image, ImageBackground, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { Card, Button } from 'react-native-elements'



export default class Home extends React.Component {
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



    render() {
        const { assetsLoaded } = this.state;
        if (assetsLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <ImageBackground source={require('../img/background.jpg')} style={styles.image}>
                            <LinearGradient style={{ height: hp('80%') }} colors={['rgba(22, 22, 22, 0.3)', 'rgba(14, 14, 14, 0.7)', 'rgba(11, 11, 11,1)']} locations={[0.10, 0.75, 1]}>
                                <Text style={styles.text}>
                                    We are developing financial AI.
                              </Text>
                            </LinearGradient>

                        </ImageBackground>
                        <LinearGradient style={{ height: hp('70%') }} colors={[' rgba(11, 11, 11,1)', 'rgba(22, 22, 22, 0.9)', 'rgba(22, 22, 22, 0.8)']} locations={[0.10, 0.75, 1]}>
                            <View style={styles.headerWrapper}>
                                <Text style={styles.headerText} >What is FinAI?</Text>
                            </View>
                            <View style={styles.infoWrapper}>
                                <Text style={styles.infoText}>
                                    Fin AI is an abbreviaton of Finance on Artificial
                                    Intelligence.We are creating machine learning models to
                                    see the effects of AI in finance markets.
                            </Text>
                            </View>
                        </LinearGradient>
                        <Card>
                            <Image source={require('../img/analysis.png')} style={{ width: 130, height: 130, alignSelf: "center" }} />

                            <View style={styles.headerWrapper}>

                                <Text style={styles.headerText2} >Analyze</Text>
                            </View>
                            <Text style={styles.cardText}>Analyzing the data as important as creating a model.The system analyzes the data first.</Text>

                        </Card>
                        <Card>
                            <Image source={require('../img/learning.png')} style={{ width: 130, height: 130, alignSelf: "center" }} />

                            <View style={styles.headerWrapper}>

                                <Text style={styles.headerText2} >Fit Model</Text>
                            </View>
                            <Text style={styles.cardText}>Analyzed data is fitted to model.We present you the ARIMA and LSTM for now.</Text>

                        </Card>
                        <Card>
                            <Image source={require('../img/data-analysis.png')} style={{ width: 130, height: 130, alignSelf: "center" }} />

                            <View style={styles.headerWrapper}>

                                <Text style={styles.headerText2}>Predict</Text>
                            </View>
                            <Text style={styles.cardText}>System runs the code behind and shows you the graph which contains actual and predicted.</Text>

                        </Card>
                    </ScrollView>
                </SafeAreaView>
            )
        }
        else {
            return (
                <ActivityIndicator></ActivityIndicator>
            )
        }
    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        height: hp('80%'),
        resizeMode: 'contain'
    },
    cardText: {
        textAlign: "center",
        color: 'black',
        fontSize: 25,
        fontFamily: 'opensans-light',
        paddingVertical: 10

    },
    scrollView: {
        backgroundColor: 'white',
    },
    text: {
        color: 'white',
        letterSpacing: 1.625,
        paddingLeft: 10,

        top: hp('10%'),
        fontFamily: 'opensans-light',
        fontSize: 60,
    },
    headerWrapper:
    {
        borderBottomWidth: 5,
        borderBottomColor: '#64a19d',
        paddingBottom: 10, width: wp('70%'),
        alignSelf: "center"
    },
    headerText: {
        fontFamily: 'opensans-bold',
        fontSize: 35, color: 'white',
        marginTop: 100,
        textAlign: "center",
        borderBottomColor: '#2cbab2',
    },
    headerText2: {
        fontFamily: 'opensans-bold',
        fontSize: 35, color: 'black',
        textAlign: "center",
        borderBottomColor: '#2cbab2',
    },
    infoWrapper: {
        width: wp('90%'),
        alignSelf: "center",
        marginTop: 20
    },
    infoText: {
        color: 'white',
        fontFamily: 'opensans-regular',
        textAlign: "center",
        fontSize: 25
    },
});

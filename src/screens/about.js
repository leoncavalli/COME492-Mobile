import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import * as firebase from 'firebase'
import Constants from 'expo-constants';
import Swiper from 'react-native-swiper'
import Card from '../shared/card'
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






export default class about extends React.Component {
    signOutUser = () => firebase.auth().signOut().then(() => {
        this.props.navigation.navigate('Login')
    }).catch(function (error) {
        alert(error)
        return error;
    });;
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
        if(assetsLoaded){return (

            <SafeAreaView style={styles.container}>
                    <ScrollView >
                        
                        <LinearGradient style={{ height: 'auto' }} colors={[' rgba(11, 11, 11,1)', 'rgba(22, 22, 22, 0.9)', 'rgba(22, 22, 22, 0.8)']} locations={[0.10, 0.75, 1]}>
                            <View style={styles.headerWrapper}>
                                <Text style={styles.headerText} >How to use FinAI ?</Text>
                            </View>
                            <View style={styles.infoWrapper}>
                            <Text style={styles.infoText}>
                                As Fin AI we provide you two machine learning methods ARIMA and LSTM which are used to forecast future values and also a Trade Robot
                            </Text>
                            </View>
                        <Swiper  >
                            <View>
                                <Card >
                                    <Image source={require('../img/arimaSelect.jpg')} style={{ height: '90%', width: '95%' , resizeMode:"contain",alignSelf:"center" }} />
                                    <Text style={styles.insideText}>
                                        After login in there are four tabs : Home , Model , Trade Robot and About. On model tab we can access our two models ARIMA and LSTM
                                    </Text>
                                    
                                   

                                </Card>
                            </View>
                            <View  >
                                <Card>
                                <Image source={require('../img/lstmSelect.jpg')} style={{ height: '90%', width: '95%' , resizeMode:"contain" ,alignSelf:"center"}} />
                                    <Text style={styles.insideText}>
                                        After login in there are four tabs : Home , Model , Trade Robot and About. On model tab we can access our two models ARIMA and LSTM
                                    </Text>

                                </Card>
                            </View>
                            <View >
                                <Card >
                                <Image source={require('../img/stockMarket.jpg')} style={{ height: '82%', width: '95%' , resizeMode:"contain" ,alignSelf:"center"}} />
                                    <Text style={styles.insideText}>
                                        On press select model , each model will require user to specify the same parameters and all parameters must be specified otherwise app will throw error. Stock name is required to get spesific stock market values
                                    </Text>

                                </Card>
                            </View>
                            <View  >
                                <Card >
                                <Image source={require('../img/dates.jpg')} style={{ height: '90%', width: '95%' , resizeMode:"contain",alignSelf:"center" }} />
                                    <Text style={styles.insideText}>
                                        Start and end dates also must be specified and keep in mind that start date must be smaller than the end date !
                                    </Text>

                                </Card>
                            </View>
                            <View  >
                                <Card >
                                <Image source={require('../img/period.jpg')} style={{ height: '90%', width: '95%' , resizeMode:"contain",alignSelf:"center" }} />
                                    <Text style={styles.insideText}>
                                        Period is where you specify whether you train your set daily , weekly , monthly or yearly . Remember that forecast process time will increase as you go yearly to daily ! After specified all parameters 'Go!' button is ready to Go!!!
                                    </Text>

                                </Card>
                            </View>
                            <View  >
                                <Card >
                                <Image source={require('../img/arimaresult.jpg')} style={{ height: '90%', width: '95%' , resizeMode:"contain",alignSelf:"center" }} />
                                    <Text style={styles.insideText}>
                                        Here is an example resut for ARIMA ! You can zoom in , zoom out or check predicted and actaul values just like every feature in plotly python
                                    </Text>

                                </Card>
                            </View>
                            <View >
                                <Card >
                                <Image source={require('../img/traderstock.jpg')} style={{ height: '90%', width: '95%' , resizeMode:"contain",alignSelf:"center" }} />
                                    <Text style={styles.insideText}>
                                    Trade Robot is an simulator which makes buys and sells according to technical indicators and various algorithms. On market select section for Trade Robot you can select multiple stock markets.
                                    </Text>

                                </Card>
                            </View>
                            <View  >
                                <Card >
                                <Image source={require('../img/dates.jpg')} style={{ height: '90%', width: '95%' , resizeMode:"contain",alignSelf:"center" }} />
                                    <Text style={styles.insideText}>
                                        Start and end dates also work the same way with ARIMA and LSTM dates, it must be specified and again keep in mind that start date must be smaller than the end date !
                                    </Text>

                                </Card>
                            </View>
                            <View >
                                <Card >
                                <Image source={require('../img/budget.jpg')} style={{ height: '90%', width: '95%' ,resizeMode:"contain", alignSelf:"center"}} />
                                    <Text style={styles.insideText}>
                                    Budget is where you specify your initial budget for starting Trade Robot. Minimum budget is $5000 and max is $100000.
                                    </Text>

                                </Card>
                            </View>
                        </Swiper>
                        <TouchableOpacity onPress={() => this.signOutUser()} style={styles.buttonContainer1}>
                            <Text style={styles.buttonText1}>Log Out</Text>
                        </TouchableOpacity>    
                        </LinearGradient>
                        
                    </ScrollView>
                </SafeAreaView>
              

            
        )}
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
        backgroundColor:'black'
    },
    image: {
        flex: 1,
        height: hp('80%'),
        resizeMode: 'contain'
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
    infoWrapper:{
        width:wp('90%'),
        alignSelf:"center",
        marginTop:20
    },
    infoText:{
        color:'white',
        fontFamily:'opensans-regular',
        fontWeight:"bold",
        fontSize:20
    },
    logo: {

        width: 320,
        height: 150,
    },
    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center"

    },
    title: {
        color: 'white',
        textAlign: "center",
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5
    },
    buttonContainer: {
        width: wp('30%'),
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "center",
        color:'#2cbab2'

    },
    buttonText1: {
        textAlign: "center",
        opacity: 1,
        fontFamily: 'opensans-bold',
        fontSize: 18, color: 'white',
    },

    innerContainer: {
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,

    },
     buttonContainer1: {
        opacity:1,
        paddingVertical: 10,
        bottom:10,
        left:0,
        right:0,
        width:100,
        alignSelf:'center',
        marginTop:40
    },insideText: {
         fontFamily: 'opensans-regular',
         textAlign: "center",
         color: 'white',
         bottom:22,
         fontSize: 15,
         fontWeight: "bold"
    }

});

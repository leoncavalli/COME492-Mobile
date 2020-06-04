
import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ImageBackground, ScrollView, Dimensions,ActivityIndicator } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Button } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient';


const customData = require('../shared/bist100.json');

export default class arimaModel extends React.Component {
    constructor(props) {
        super(props)
        var currentdate = new Date().getDate()

        this.state = {
            dateStart: currentdate,
            dateEnd: currentdate,

        }
        this.state = ({
            indexStock: '',
            indexPeriod: '',
            stockName: '',
            periodType: '',
            selectedItems: [],
            data:[],
            array:[]
        })
    }
    state = {
        assetsLoaded: false,
    };


    postData = async () => {


        fetch('http://192.168.1.35:8000/simpleapi2/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                "startDate": this.state.dateStart,
                "endDate": this.state.dateEnd,
                "stock": this.state.stockName,
                "period": this.state.periodType

            }


            )
        }).then((response) => response.json())
            .then((responseJson) => {
               
                    this.setState({ array: responseJson.data })
             

            }).then(()=>{
            
                this.props.navigation.navigate('LstmResult',{data: this.state.array})
                
            })
            .catch((error) => {
                if (this.state.dateStart == 0 || this.state.dateEnd == 0 || this.state.stockName == 0 || this.state.periodType == 0) {
                    alert("Please select all informations")
                    return
                }
            })
            ;



    }
    render() {
       

        
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Swiper style={{ marginTop: 90 }} loop={false} >
                    <View style={{ height: '70%' }} >
                                <View>
                                    <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                        LSTM</Text></View>
                                <Card height={hp('30%')} >
                                    <Image source={require('../img/fieldset1.png')} style={{position:'absolute',width:100,height:110,right:0,top:30}}/>
                                    <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 30, textAlign:"left", paddingTop: 15, color: 'black' }}>
                                        STOCK</Text>
                                    <ModalDropdown defaultValue="Select Stock Market ..." onSelect={(indexStock, stockName) => this.setState({ indexStock, stockName })} options={customData.map(s => s.Symbol)} textStyle={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        color: "black",
                                        marginLeft: 5,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        
                                    }} style={{
                                        width: wp('54%'),
                                        height: hp('5%'),
                                        fontSize: 20,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        marginLeft: 5,
                                        marginTop: 10,
                                        position:'absolute',
                                        top:70,
                                        right:110
                                    }} dropdownStyle={{
                                        borderRadius: 4,
                                        width: wp('54%'),
                                        height: 100,
                                        borderRadius: 1,
                                        borderWidth: 1,
                                        borderColor: "black"
                                    }} />
                                </Card>
                            </View>
                        <View style={{ height: '70%' }}  >
                            <View>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    LSTM</Text></View>
                            <Card height={hp('30%')}  >
                            <Image source={require('../img/fieldset3.png')} style={{position:'absolute',width:100,height:110,right:0,top:30}}/>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 30, textAlign: "left", paddingTop: 1, color: 'black' }}>
                                    DATES</Text>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 1, fontSize: 13, textAlign: "left", bottom:7,top:10, left:75, color: 'black' }}>
                                    Start Date</Text>
                                    <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 1, fontSize: 13, textAlign: "left", bottom:7,top:52, left:75, color: 'black' }}>
                                    End Date</Text>
                                <DatePicker
                                    style={{ width: wp('55%'), height: hp('7%'), position:'absolute', top:70,right:115 }}
                                    date={this.state.dateStart}
                                    mode="date"
                                    format="DD/MM/YYYY"
                                    minDate="01/05/2000"
                                    maxDate={this.state.currentdate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"

                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 2
                                        },
                                        dateInput: {
                                            marginLeft: 40
                                        },
                                        placeholderText: {
                                            color: "black"
                                        },
                                        dateText: {
                                            color: "black",
                                            fontSize: 15
                                        }

                                    }}
                                    onDateChange={(date) => { this.setState({ dateStart: date }) }} />
                                    <DatePicker
                                        style={{ width: wp('55%'), height: hp('7%'), position:'absolute', top:130,right:115 }}
                                        date={this.state.dateEnd}
                                        mode="date"
                                        format="DD/MM/YYYY"
                                        minDate="01/05/2000"
                                        maxDate={this.state.currentdate}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"

                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 2
                                            },
                                            dateInput: {
                                                marginLeft: 40
                                            },
                                            placeholderText: {
                                                color: "black"
                                            },
                                            dateText: {
                                                color: "black",
                                                fontSize: 15
                                            }
    
                                        }}
                                        onDateChange={(date) => { this.setState({ dateEnd: date }) }}
                                    />
                                    
                            </Card>
                        </View>
                       
                            
                            
                            <View style={{ height: '70%' }} >
                                <View>
                                    <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                        LSTM</Text></View>
                                <Card height={hp('30%')} >
                                <Image source={require('../img/fieldset3.png')} style={{position:'absolute',width:100,height:110,right:0,top:30}}/>
                                    <Text style={{ fontFamily: 'opensans-bold',position:'absolute', letterSpacing: 3, fontSize: 30, textAlign:"left", paddingTop: 15, color: 'black' }}>
                                        PERIOD</Text>
                                    <ModalDropdown defaultValue="Select Period Type ..." onSelect={(indexPeriod, periodType) => this.setState({ indexPeriod, periodType })} options={['Daily', 'Weekly', 'Monthly', 'Yearly']} textStyle={{
                                      fontSize: 15,
                                      fontWeight: "bold",
                                      color: "black",
                                      marginLeft: 5,
                                      marginTop: 5,
                                      marginBottom: 5,
                                      
                                  }} style={{
                                      width: wp('54%'),
                                      height: hp('5%'),
                                      fontSize: 20,
                                      borderRadius: 5,
                                      borderWidth: 1,
                                      borderColor: "black",
                                      marginLeft: 5,
                                      marginTop: 10,
                                      position:'absolute',
                                      top:70,
                                      right:110
                                  }} dropdownStyle={{
                                      borderRadius: 4,
                                      width: wp('54%'),
                                      height: 100,
                                      borderRadius: 1,
                                      borderWidth: 1,
                                      borderColor: "black"
                                  }} />

                                <TouchableOpacity style={styles.buttonContainer1}>
                                    <Text style={styles.buttonText1} onPress={this.postData}>Go !</Text>
                                </TouchableOpacity>


                                </Card>
                            </View>
                            
                    </Swiper>
                </KeyboardAvoidingView>




            )
       
    }


}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#1D1B26',
        flex: 1,
    },
    Header: {
        marginTop: 20,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 30,
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
        marginTop: 30,


    },
    signoutContainer: {
        position: 'absolute',
        bottom: 2,
        left: 0,
        right: 0
    },
    touchableText: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        opacity: 1,
        marginTop: 15,

    },
    buttonText: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        opacity: 1,

    },
    buttonContainer1: {
        backgroundColor: '#2cbab2',
        paddingVertical: 10,
        left:254,
        position: 'absolute',
        top:144,
        width: wp('20%'),
        height:hp('6%')
        

    },
    buttonText1: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        fontSize:15

    },
    cardimage: {
        height: 100,
        width: 200,
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
        color: 'black',
        fontWeight: "bold",
        opacity: 1,
        marginTop: 10,
        
        marginBottom: 3,
        fontSize: 17,
        alignSelf:'center'
    }
});
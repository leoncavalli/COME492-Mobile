import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ScrollView, ImageBackground, ActivityIndicator, Slider } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as firebase from 'firebase'
import { Card, Button } from 'react-native-elements'
import * as Font from 'expo-font';
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient';
import MultiSelect from 'react-native-multiple-select';
import DatePicker from 'react-native-datepicker'

const customData = require('../shared/bist100.json');
export default class welcome extends React.Component {
    constructor(props) {
        super(props)
        var currentdate = new Date()

        this.state = {
            dateStart: currentdate,
            dateEnd: currentdate,
            budget: '0',
            minimumValue: 5000,
            maximumValue: 100000,
            selectedItems: [],


        }
    }
    state = {
        assetsLoaded: false,
    };



    async componentDidMount() {
        await Font.loadAsync({

            'opensans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
            'opensans-light': require('../../assets/fonts/OpenSans-Light.ttf'),
            'opensans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
            'montserrat-light': require('../../assets/fonts/Montserrat-Light.ttf')


        });
        this.setState({ assetsLoaded: true });
    }
    postData = async () => {


        fetch('http://192.168.1.35:8000/simpleapi/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                'selectedItems': this.state.selectedItems,


            }


            )
        }).then((response) => response.json())
            .then((responseJson) => {
                if (this.state.selectedItems != 0) {
                    this.setState({ text: responseJson.selectedItems })
                }
                else {
                    alert("Please select all informations")
                    return
                }

            })
            .catch((error) => {
                console.error(error);
            })
            ;



    }
    render() {
        const { assetsLoaded } = this.state;
        const { selectedItems } = this.state;
        const { heightView } = this.state
        const { showheight } = this.state
        if (assetsLoaded) {
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Swiper loop={false} >
                        <View>
                            <View>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    STOCKS</Text>
                            </View>
                            <Card height={hp('60%')} >
                                <Image source={require('../img/fieldset3.png')} style={{ width: '90%', height: '50%', alignSelf: "center" }} />

                                <View >
                                   
                                    <MultiSelect
                                        hideTags
                                        styleMainWrapper={{ height: '35%', top: '15%' }}
                                        ref={(component) => { this.multiSelect = component }}
                                        items={customData}
                                        uniqueKey="Symbol"
                                        onSelectedItemsChange={(selectedItems) => { this.setState({ selectedItems }) }}
                                        selectedItems={selectedItems}
                                        fontSize={24}

                                        selectText="  Pick Items"
                                        searchInputPlaceholderText="Search Items..."
                                        onChangeInput={(text) => console.log(text)}
                                        tagRemoveIconColor="black"
                                        tagBorderColor="black"
                                        tagTextColor="black"
                                        fontFamily='opensans-regular'
                                        selectedItemTextColor="black"
                                        selectedItemIconColor="#2cbab2"
                                        itemTextColor="black"
                                        itemFontFamily='opensans-light'
                                        displayKey="Name"
                                        searchInputStyle={{
                                            color: "black", padding: 15
                                        }}



                                        styleDropdownMenu={{
                                            zIndex: 15,
                                            height: '100%'
                                        }}
                                        submitButtonColor="#2cbab2"
                                        submitButtonText="Submit"
                                    />
                                </View>

                            </Card>
                        </View>
                        <View   >
                            <View >
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    DATES</Text></View>
                            <Card height={hp('60%')}  >
                                <Image source={require('../img/trader1.png')} style={{ width: '90%', height: '50%', alignSelf: "center" }} />
                                <View>
                                    <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 1, alignSelf: "center", fontSize: 15, textAlign: "left", marginTop: 15, color: 'black' }}>
                                        Start Date</Text>
                                    <DatePicker
                                        style={{ width: '80%', marginTop: 5, alignSelf: "center" }}
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
                                                left: 6,
                                                top: 4,

                                            },
                                            dateInput: {
                                                borderRadius: 10,
                                            },
                                            placeholderText: {
                                                color: "black"
                                            },
                                            dateText: {
                                                fontFamily: 'opensans-light',
                                                color: "black",
                                                fontSize: 18
                                            }

                                        }}
                                        onDateChange={(date) => { this.setState({ dateStart: date }) }} />
                                    <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 1, alignSelf: "center", fontSize: 15, marginTop: 15, textAlign: "left", color: 'black' }}>
                                        End Date</Text>
                                    <DatePicker
                                        style={{ width: '80%', alignSelf: "center" }}
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
                                                left: 6,
                                                top: 4,

                                            },
                                            dateInput: {
                                                borderRadius: 10,


                                            },
                                            placeholderText: {
                                                color: "black"
                                            },
                                            dateText: {
                                                fontFamily: 'opensans-light',
                                                color: "black",
                                                fontSize: 18
                                            }

                                        }}
                                        onDateChange={(date) => { this.setState({ dateEnd: date }) }}
                                    />
                                </View>
                            </Card>
                        </View>
                        <View  >
                            <View>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    BUDGET</Text></View>
                            <Card height={hp('60%')} >
                                <Image source={require('../img/trader2.png')} style={{ width: '80%', height: '50%', alignSelf: "center" }} />

                                <Slider
                                    style={{ width: '100%', marginTop: '10%' }}
                                    step={5000}
                                    maximumValue={this.state.maximumValue}
                                    minimumValue={this.state.minimumValue}
                                    value={this.state.minimumValue}
                                    onValueChange={val => this.setState({ budget: val })}

                                    thumbTintColor='#2cbab2'
                                    maximumTrackTintColor='#d3d3d3'
                                    minimumTrackTintColor='#2cbab2'

                                />

                                <Text style={{
                                    textAlign: "center", fontFamily: 'opensans-light', fontSize: 25
                                }}>${this.state.budget} </Text>
                                <Button style={{ marginTop: 25, paddingVertical: 10 }} ViewComponent={LinearGradient}
                                    linearGradientProps={{
                                        colors: ['#2cbab2', '#64a19d'],
                                        start: { x: 0, y: 0.5 },
                                        end: { x: 1, y: 0.5 },
                                    }} title="SIMULATE" onPress={() => this.props.navigation.navigate('ArimaModel')} titleStyle={{ fontFamily: 'opensans-bold' }}></Button>


                            </Card>
                        </View>

                    </Swiper>
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
        position: "absolute",
        top: 380,
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
        backgroundColor: '#2cbab2',
        paddingVertical: 10,
        alignSelf: "center",
        position: 'absolute',
        top: 240,

        left: 85,
        width: wp('40%'),
        height: hp('6%')


    },
    buttonText1: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        fontSize: 15

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

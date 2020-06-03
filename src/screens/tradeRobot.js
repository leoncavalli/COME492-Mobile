import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ScrollView, ImageBackground, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Slider } from 'react-native';
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
        var currentdate = new Date().getDate()

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
        const {heightView} = this.state
        const {showheight}=this.state
        if (assetsLoaded) {
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Swiper style={{ marginTop: 30 }} loop={false} >
                        <View style={{ height: '70%' }} >
                            <View>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    TRADE</Text></View>
                            <Card height={hp('50%')} >
                                <MultiSelect
                                    hideTags
                                    ref={(component) => { this.multiSelect = component }}
                                    items={customData}
                                    uniqueKey="Symbol"
                                    onSelectedItemsChange={(selectedItems) => { this.setState({ selectedItems }) }}
                                    selectedItems={selectedItems}
                                    selectText="  Pick Items"
                                    searchInputPlaceholderText="Search Items..."
                                    onChangeInput={(text) => console.log(text)}
                                    tagRemoveIconColor="black"
                                    tagBorderColor="black"
                                    tagTextColor="black"
                                    fontSize='18'
                                    selectedItemTextColor="black"
                                    selectedItemIconColor="black"
                                    itemTextColor="black"
                                    displayKey="Name"
                                    searchInputStyle={{ color: '"black"' }}
                                    submitButtonColor="#CCC"
                                    submitButtonText="Submit"
                                    styleDropdownMenu={{
                                        width: wp('75%'),
                                        marginLeft: wp('5%'),
                                        marginTop: wp('5%'),

                                    }}
                                    searchInputStyle={{
                                        height: 50
                                    }}

                                    styleDropdownMenuSubsection={
                                        {

                                        }
                                    }
                                    styleListContainer={{
                                        height: hp('30%')
                                    }}
                                />
                                <View  style={{ height:hp('30%') }}><ScrollView>
                                    {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                                </ScrollView></View>
                                

                            </Card>
                        </View>
                        <View style={{ height: '70%' }}  >
                            <View >
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    TRADE</Text></View>
                            <Card height={hp('30%')} marginTop={80} >
                                <Image source={require('../img/fieldset3.png')} style={{ position: 'absolute', width: 100, height: 110, right: 0, top: 30 }} />
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 30, textAlign: "left", paddingTop: 1, color: 'black' }}>
                                    DATES</Text>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 1, fontSize: 13, textAlign: "left", bottom: 7, top: 10, left: 75, color: 'black' }}>
                                    Start Date</Text>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 1, fontSize: 13, textAlign: "left", bottom: 7, top: 52, left: 75, color: 'black' }}>
                                    End Date</Text>
                                <DatePicker
                                    style={{ width: wp('55%'), height: hp('7%'), position: 'absolute', top: 70, right: 115 }}
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
                                    style={{ width: wp('55%'), height: hp('7%'), position: 'absolute', top: 130, right: 115 }}
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
                                    TRADE</Text></View>
                            <Card height={hp('50%')} >
                                <Slider
                                    style={{ width: wp('75%'), height: hp('5%'), position: "absolute", left: 10, right: 50, top: 50 }}
                                    step={1}
                                    maximumValue={this.state.maximumValue}
                                    minimumValue={this.state.minimumValue}
                                    value={this.state.minimumValue}
                                    onValueChange={val => this.setState({ budget: val })}

                                    thumbTintColor='#2cbab2'
                                    maximumTrackTintColor='#d3d3d3'
                                    minimumTrackTintColor='#2cbab2'

                                />

                                <Text style={{
                                    textAlign: "center", position: "absolute", top: 150, left: 60,
                                    right: 60, color: "black", fontSize: 20, fontWeight: "bold"
                                }}>Specified budget : {this.state.budget} $</Text>
                                <TouchableOpacity style={styles.buttonContainer1}>
                                    <Text style={styles.buttonText1} >Simulate!</Text>
                                </TouchableOpacity>


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

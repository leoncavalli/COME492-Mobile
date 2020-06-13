import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ScrollView, ImageBackground, ActivityIndicator, Slider } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { StackNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as firebase from 'firebase'
import { Card, Button } from 'react-native-elements'
import * as Font from 'expo-font';
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient';
import MultiSelect from 'react-native-multiple-select';
import DatePicker from 'react-native-datepicker'
import AnimatedLoader from "react-native-animated-loader";
const customData = require('../shared/bist100.json');
export default class welcome extends React.Component {
    constructor(props) {
        super(props)
        var currentdate = new Date()

        this.state = {
            dateStart: currentdate,
            dateEnd: currentdate,
            budget: 5000,
            minimumValue: 5000,
            maximumValue: 100000,
            selectedItems: [],
            finalData: [],
            isLoading: false

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
        this.setState({
            isLoading: true
        })

        fetch('http://192.168.1.39:8000/simpleapi3/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                "selectedItems": this.state.selectedItems,
                "budget": this.state.budget
            }
            )
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ finalData: responseJson })
                this.setState({ isLoading: false })
            }).then(() => {
                this.props.navigation.navigate('TradeResult', { finalData: this.state.finalData, initBudget: this.state.budget })

            })
            .catch((error) => {

                if (this.state.selectedItems == 0 || this.state.budget == 0) {
                    alert("Please select all informations")
                    this.setState({ isLoading: false })
                    return
                };
            })
    }
    render() {
        const { assetsLoaded } = this.state;
        const { heightView } = this.state
        const { showheight } = this.state
        if (assetsLoaded) {
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <AnimatedLoader
                        visible={this.state.isLoading}
                        overlayColor="rgba(255,255,255,0.75)"
                        animationStyle={styles.lottie}
                        speed={1}
                    />
                    <Swiper loop={false} >
                        <View>
                            <View>
                                <Text style={{ fontFamily: 'opensans-bold', letterSpacing: 3, fontSize: 40, textAlign: "center", paddingTop: 15, color: 'white' }}>
                                    STOCKS</Text>
                            </View>
                            <Card height={hp('60%')} >
                                <View style={{ height: '50%', zIndex: 100 }} >
                                    <DropDownPicker
                                        items={customData.map((s) => (
                                            { label: s.Name, value: s.Symbol }
                                        ))}

                                        dropDownMaxHeight={hp('45%')}
                                        multiple={true}
                                        multipleText="%d stocks have been selected."
                                        min={0}
                                        max={10}
                                        searchable={true}
                                        searchableStyle={{ fontSize: 20, color: '#a6a6a6' }}
                                        defaultValue={this.state.country}
                                        containerStyle={{ height: 50, marginTop: hp('1%') }}
                                        style={{ backgroundColor: '#fafafa' }}
                                        labelStyle={{ fontFamily: 'opensans-regular', fontSize: 18, color: '#0b0b0b', textAlign: 'center' }}
                                        dropDownStyle={{ borderColor: '#2cbab2', backgroundColor: '#fafafa', paddingHorizontal: 15, paddingVertical: 0 }}
                                        onChangeItem={item => this.setState({
                                            selectedItems: item
                                        })}
                                    />
                                </View>
                                <Image source={require('../img/fieldset3.png')} style={{ width: '90%', height: '50%', alignSelf: "center" }} />
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
                                    onValueChange={value => {
                                        clearTimeout(this.sliderTimeoutId)
                                        this.sliderTimeoutId = setTimeout(() => {
                                            this.setState({ budget: value })
                                        }, 100)
                                    }}
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
                                    }} title="SIMULATE" onPress={this.postData} titleStyle={{ fontFamily: 'opensans-bold' }}></Button>


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
    },
    lottie: {
        width: wp('20%'),
        height: hp('20%'),
    }
});

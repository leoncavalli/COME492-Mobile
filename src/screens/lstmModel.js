
import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, Dimensions,ActivityIndicator } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Button } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import AnimatedLoader from "react-native-animated-loader";
import * as Font from 'expo-font';


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
            array:[],
            layout:[],
            isLoading : false
        })
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
            isLoading:true
        })

        fetch('http://192.168.1.39:8000/simpleapi2/', {
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
                    this.setState({ layout: responseJson.layout })
                    this.setState({isLoading:false})
             

            }).then(()=>{
            
                this.props.navigation.navigate('LstmResult',{data: this.state.array, layout: this.state.layout})
                
            })
            .catch((error) => {
                if (this.state.dateStart == this.state.currentdate || this.state.dateEnd == this.state.currentdate || this.state.stockName == 0 || this.state.periodType == 0) {
                    alert("Please select all informations")
                    this.setState({isLoading:false})
                    return
                }
            })
            ;



    }
    render() {
       

        
        const { assetsLoaded } = this.state;

        if (assetsLoaded) {
            return (

                <KeyboardAvoidingView behavior="padding" style={styles.container} >
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
                                    STOCK</Text>
                            </View>
                            <Card height={hp('60%')} >
                                <Image source={require('../img/fieldset3.png')} style={{ width: '90%', height: '50%', alignSelf: "center" }} />

                                <View style={{ height: '50%' }} >

                                    <DropDownPicker
                                        items={customData.map((s) => (
                                            { label: s.Name, value: s.Symbol }
                                        ))}
                                        defaultValue={null}
                                        placeholder='Select a stock market'
                                        containerStyle={{ height: 50, marginTop: hp('1%') }}
                                        style={{ backgroundColor: '#fafafa' }}
                                        labelStyle={{ fontFamily: 'opensans-regular', fontSize: 18, color: '#0b0b0b', textAlign: 'center' }}

                                        dropDownStyle={{ borderColor: '#2cbab2', backgroundColor: '#fafafa', paddingHorizontal: 0, paddingVertical: 0 }}
                                        onChangeItem={item => this.setState({
                                            stockName: item.value
                                        })}
                                        activeItemStyle={{ backgroundColor: 'rgba(44, 186, 178,0.5)' }}
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
                                        date={null}
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
                                    PERIOD</Text></View>
                            <Card height={hp('60%')} >
                                <Image source={require('../img/trader2.png')} style={{ width: '90%', height: '50%', alignSelf: "center" }} />
                                <View style={{ height: '30%' , zIndex:100}} >

                                    <DropDownPicker
                                        items={[{label:'Daily',value:'Daily'},
                                                {label:'Weekly',value:'Weekly'},
                                                {label:'Monthly',value:'Monthly'}]}
                                        defaultValue={null}
                                        placeholder='Select a period'
                                        containerStyle={{ height: 50, marginTop: hp('1%') }}
                                        style={{ backgroundColor: '#fafafa' }}
                                        labelStyle={{ fontFamily: 'opensans-regular', fontSize: 18, color: '#0b0b0b', textAlign: 'center' }}

                                        dropDownStyle={{ borderColor: '#2cbab2', backgroundColor: '#fafafa', paddingHorizontal: 0, paddingVertical: 0 }}
                                        onChangeItem={item => this.setState({
                                            periodType: item.value
                                        })}
                                        activeItemStyle={{ backgroundColor: 'rgba(44, 186, 178,0.5)' }}
                                    />




                                </View>

                                <Button style={{ marginTop: 10, paddingVertical: 10 }} ViewComponent={LinearGradient}
                                    linearGradientProps={{
                                        colors: ['#2cbab2', '#64a19d'],
                                        start: { x: 0, y: 0.5 },
                                        end: { x: 1, y: 0.5 },
                                    }} title="GO!" onPress={this.postData} titleStyle={{ fontFamily: 'opensans-bold' }}></Button>


                            </Card>
                        </View>

                    </Swiper>
                   
                </KeyboardAvoidingView>




            )
        }
        else {
            return (<View><ActivityIndicator></ActivityIndicator></View>)
        }
       
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
    },
    lottie: {
        width: wp('20%'),
        height: hp('20%'),
      }
});
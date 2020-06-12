import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ScrollView, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Card from '../shared/modelCard'
import { Card, Button } from 'react-native-elements'
import * as firebase from 'firebase'
import * as Font from 'expo-font';
import ProgressCircle from 'react-native-progress-circle'

import { PieChart } from "react-native-chart-kit";


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

export default class tradeResult extends React.Component {
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
            text: '',
        })
    }

    render() {
        const { assetsLoaded } = this.state;

        const initialBudget = this.props.route.params.initBudget;
        let finalBudget = this.props.route.params.finalData.budget;
        let cash = this.props.route.params.finalData.cash;
        const finalPortfolio_ = this.props.route.params.finalData.portfolio;

        const latests_ = this.props.route.params.finalData.latests;

        Object.keys(finalPortfolio_).forEach(key => {
            if (finalPortfolio_[key] === 0) {
                delete finalPortfolio_[key];
            }
        });
        var stocks = Object.keys(finalPortfolio_);
        var stockquantity = Object.values(finalPortfolio_);
        finalBudget = finalBudget + cash
        let profitpercentage = (finalBudget / initialBudget * 100) - 100;
        profitpercentage =parseFloat(profitpercentage.toFixed(2));

        let currentvalue = 0
        Object.keys(finalPortfolio_).forEach(key => {
            currentvalue += latests_[key] * finalPortfolio_[key];
        })
        let currentValueStr = currentvalue.toLocaleString(
            undefined,
            { minimumFractionDigits: 2 }
        );
        let initialBudgetStr = initialBudget.toLocaleString(
            undefined,
            { minimumFractionDigits: 2 }
        );
        let finalBudgetStr = finalBudget.toLocaleString(
            undefined,
            { minimumFractionDigits: 2 }
        );
        let colors=['#F4511E','#4CAF50','#1E88E5','#1E88E5','#1E88E5','#1E88E5']
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
        };
        var data = [];
        for (var i = 0; i < stocks.length; i++) {
            data.push({ name: stocks[i], value: stockquantity[i], color:colors[i]});
        }
        
        if (assetsLoaded) {
            if (stocks.length > 0) {
                return (

                    <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <ScrollView>
                            <View style={styles.container}>
                                <Card >
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Initial Budget</Text>
                                    </View>
                                    <Text style={styles.cardText}>${initialBudgetStr}</Text>
                                </Card>
                                <Card >
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Final Budget</Text>
                                    </View>
                                    <Text style={styles.cardText}>${finalBudgetStr}</Text>

                                </Card>
                                <Card >
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Portfolio Value</Text>
                                    </View>
                                    <Text style={styles.cardText}>${currentValueStr}</Text>

                                </Card>
                                <Card>
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Budget Profit</Text>
                                    </View>
                                    <ProgressCircle
                                        percent={profitpercentage}
                                        radius={100}
                                        borderWidth={30}
                                        outerCircleStyle={{ marginTop: 15,alignSelf:"center"}}

                                        color="#2cbab2"
                                        shadowColor="#999"
                                        bgColor="#fff"
                                    >
                                        <Text style={{ fontSize: 18 }}>{profitpercentage+'%'}</Text>
                                    </ProgressCircle>
                                </Card>
                                <Card>
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Portfolio</Text>
                                    </View>
                                    <PieChart
                                        data={data}
                                        width={wp('90%')}
                                        height={220}
                                        chartConfig={chartConfig}
                                        accessor="value"
                                        backgroundColor="transparent"
                                        paddingLeft="15"
                                        absolute
                                    />
                                </Card>


                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>

                )

            } else {
                return (

                    <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <ScrollView>
                            <View style={styles.container}>


                                <Card>
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Initial Budget</Text>
                                    </View>
                                    <Text style={styles.cardText}>${initialBudgetStr}</Text>
                                </Card>
                                <Card>
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Final Budget</Text>
                                    </View>
                                    <Text style={styles.cardText}>${finalBudgetStr}</Text>

                                </Card>
                                <Card>
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Portfolio Value</Text>
                                    </View>
                                    <Text style={styles.cardText}>${currentValueStr}</Text>

                                </Card>
                                <Card>
                                    <View style={styles.headerWrapper}>
                                        <Text style={styles.headerText} >Initial Budget</Text>
                                    </View>
                                    <ProgressCircle
                                        percent={profitpercentage}
                                        radius={100}
                                        borderWidth={30}
                                        outerCircleStyle={{ marginTop: 15, marginLeft: 50 }}

                                        color="#3399FF"
                                        shadowColor="#999"
                                        bgColor="#fff"
                                    >
                                        <Text style={{ fontSize: 18 }}>{profitpercentage+'%'}</Text>
                                    </ProgressCircle>
                                </Card>
                                <Card >
                                    <Text style={styles.cardText}>No stocks left in portfolio.</Text>
                                </Card>


                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>

                )
            }
        }
        else {
            return (<ActivityIndicator></ActivityIndicator>)
        }

    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1D1B26'
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
        paddingVertical: 10,
        marginTop: 100,
    },
    touchableText: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        opacity: 1,
        marginTop: 15,

    },
    cardText: {
        textAlign: "center",
        color: 'black',
        fontSize: 25,
        fontFamily: 'opensans-light',
        paddingVertical: 10

    },
    buttonContainer1: {
        backgroundColor: '#2cbab2',
        paddingVertical: 10,
        alignSelf: "center",
        borderRadius: 5,
        marginTop: 10,
        width: '95%',

    },
    buttonText1: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold",
        fontSize: 55,


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
        color: 'white',
        fontWeight: "bold",
        opacity: 1,
        marginTop: 10,
        marginLeft: 68,
        marginBottom: 3,
        fontSize: 15,
    },
    headerWrapper:
    {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 10, width: wp('70%'),
        alignSelf: "center"
    },
    headerText: {
        fontFamily: 'opensans-bold',
        fontSize: 25, color: 'black',

        textAlign: "center",
        borderBottomColor: 'black',
    },
});

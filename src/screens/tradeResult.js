import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ScrollView, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Card from '../shared/modelCard'
import { Card, Button } from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown'
import * as firebase from 'firebase'
import Plotly from 'react-native-plotly'
import * as ScreenOrientation from 'expo-screen-orientation'
import { LinearGradient } from 'expo-linear-gradient';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


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
        const initialBudget = this.props.route.params.initBudget;
        let finalBudget = this.props.route.params.finalData.budget;
        let cash = this.props.route.params.finalData.cash;
        const finalPortfolio_ = this.props.route.params.finalData.portfolio;
        const latests_ = this.props.route.params.finalData.latests;
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
        Object.keys(finalPortfolio_).forEach(key => {
            if (finalPortfolio_[key] === 0) {
              delete finalPortfolio_[key];
            }
          });
        finalBudget+=cash
          let currentvalue=0
          Object.keys(finalPortfolio_).forEach(key=>{
              currentvalue+=latests_[key]*finalPortfolio_[key];
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
        const data = [
            {
                name: "Seoul",
                population: 21500000,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Toronto",
                population: 2800000,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Beijing",
                population: 527612,
                color: "red",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "New York",
                population: 8538000,
                color: "#f0f0f0",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Moscow",
                population: 11920000,
                color: "rgb(0, 0, 255)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }
        ];

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView>
            <View style={styles.container}>

                <PieChart
                    data={data}
                    width={350}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    
                />
            <Card height={hp('15%')}>
                        <View style={styles.headerWrapper}>
                            <Text style={styles.headerText} >Initial Budget</Text>
                        </View>
                        <Text style={styles.cardText}>${initialBudgetStr}</Text>
            </Card>
            <Card height={hp('15%')}>
                        <View style={styles.headerWrapper}>
                            <Text style={styles.headerText} >Final Budget</Text>
                        </View>
                        <Text style={styles.cardText}>${finalBudgetStr}</Text>
                        
            </Card>
            <Card height={hp('15%')}>
                        <View style={styles.headerWrapper}>
                            <Text style={styles.headerText} >Portfolio Value</Text>
                        </View>
                        <Text style={styles.cardText}>${currentValueStr}</Text>
                        
            </Card>
            
                

            </View>
            </ScrollView>
            </KeyboardAvoidingView>

        )
    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
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
        fontWeight: "bold",
        marginTop:10

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
        fontSize: 12,
    },
    headerWrapper:
    {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 10, width: wp('70%'),
        alignSelf: "center"
    },
    headerText: {
        fontFamily: 'opensans-bold',
        fontSize: 15, color: 'black',
        
        textAlign: "center",
        borderBottomColor: 'black',
    },
});

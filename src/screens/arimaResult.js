import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Card from '../shared/modelCard'
import { Card, Button } from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown'
import * as firebase from 'firebase'
import { LineChart } from 'react-native-chart-kit'
import Plotly from 'react-native-plotly'
import * as ScreenOrientation from 'expo-screen-orientation'
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

const upData = {
    __id: 'up',
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 3, 4, 8],
    type: 'scatter'
};

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
            text: '',
            data: [upData],
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <Plotly
                data={this.props.route.params.data}
                layout={this.props.route.params.layout}
                onLoad={() => console.log('loaded')}
                debug
                enableFullPlotly
                 />
                 <Button style={{marginBottom:20,width:wp('50%'),alignSelf:"center"}} ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
                colors: ['#FFC107', '#FFC107'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
            }} title="Try Another" onPress={() => this.props.navigation.navigate('ModelPage')} titleStyle={{ fontFamily: 'opensans-bold' }}></Button>
            </View>
            
            
            )
    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'white'
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
    }
});

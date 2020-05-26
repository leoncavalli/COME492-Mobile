import * as React from 'react';
import {View , Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet,Image, ImageBackground } from 'react-native';
import {StackNavigator} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../shared/modelCard'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase'
const firebaseConfig={
    apiKey: "AIzaSyCNZpZqclLipXzpQVELS-Q4BM3HSSxC6zQ",
    authDomain: "myproject-d36ff.firebaseapp.com",
    databaseURL: "https://myproject-d36ff.firebaseio.com",
    projectId: "myproject-d36ff",
    storageBucket: "myproject-d36ff.appspot.com",
    messagingSenderId: "1000055141805",
    appId: "1:1000055141805:web:20fb9b41147af32b399d24"
};
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default class arimaModel extends React.Component {
    constructor(props){
        super(props)
        var currentdate = new Date().getDate()
        this.state = {dateStart: currentdate,
            dateEnd:currentdate,
        }
        this.state=({
            indexStock:'',
            indexPeriod:'',
        stockName: '',
        periodType:'',
        text: ''
        })
      }
    
    postData = async () => {
        fetch('http://127.0.0.1:8000/simpleapi/',{

        method:'POST',
        body:this.stockName
        }).then((response)=>response.json())
        .then((responseJson)=>{this.setState({text: JSON.stringify(responseJson)})}
        ).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
            });



    }
    // _dropdown_4_onSelect(idx, value) {
    //     // BUG: alert in a modal will auto dismiss and causes crash after reload and touch. @sohobloo 2016-12-1
    //     //alert(`idx=${idx}, value='${value}'`);
    //     console.debug(`idx=${idx}, value='${value}'`);
    //   }

    signOutUser = () => firebase.auth().signOut().then(()=>{
        this.props.navigation.navigate('Login') 
    }).catch(function(error) {
        alert(error)
        return error;
      });;
    render(){
        
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
            <ImageBackground style={styles.backgroundImage} source={require('../img/bg-signup.jpg')}>
            <View>
            <Text style={styles.Header}>Welcome</Text>
                <Text style={styles.Header}>You have selected Arima Model</Text>
                
            </View>
            <View style={{
                       flexDirection: "row",
                       
                        }}>
            

                        <Card><Text style={styles.touchableText}>ARIMA</Text>

                            <Text style={styles.insideText}>Select Start Date</Text>
                            
                            <DatePicker
                                style={{ width: 200 , height:50,}}
                                date={this.state.dateStart}
                                mode="date"
                                format="YYYY-MM-DD"
                                minDate="2000-05-01"
                                maxDate="2025-05-01"
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
                                    placeholderText:{
                                        color:"black"
                                    },
                                    dateText:{
                                        color:"white",
                                        fontSize:15
                                    }
                                    
                                }}
                                onDateChange={(date) => { this.setState({ dateStart: date }) }}
                            />
                            <Text style={styles.insideText}>Select End Date</Text>
                            <DatePicker
                                style={{ width: 200, height: 50, }}
                                date={this.state.dateEnd}
                                mode="date"
                                format="YYYY-MM-DD"
                                minDate="2000-05-01"
                                maxDate="2025-05-01"
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
                                        color: "white",
                                        fontSize: 15
                                    }

                                }}
                                onDateChange={(date) => { this.setState({ dateEnd: date }) }}
                            />
                            
                            <ModalDropdown defaultValue="Select Stock Market ..." onSelect={(indexStock, stockName) => this.setState({indexStock,stockName})} options={['akbnk','VKFBNK']} textStyle={{
                                fontSize:15,
                                fontWeight:"bold",
                                color:"white",
                                marginLeft:5,
                                marginTop:5,
                                marginBottom:5,
                            }} style={{
                                width:wp('52%'),
                                fontSize:20,
                                borderRadius:5,
                                borderWidth:1,
                                borderColor:"white",
                                marginLeft:5,
                                marginTop:10,
                            }} dropdownStyle={{
                                borderRadius:4,
                                width:wp('52%'),
                                height:200,
                                borderRadius:2,
                                borderWidth:5,
                                borderColor:"white"
                            }} />

                            

                            <ModalDropdown defaultValue="Select Period Type ..." onSelect={(indexPeriod, periodType) => this.setState({indexPeriod,periodType})} options={['Daily', 'Weekly','Monthly','Yearly']} textStyle={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "white",
                                marginLeft: 5,
                                marginTop: 5,
                                marginBottom: 5,
                            }} style={{
                                width: wp('52%'),
                                fontSize: 20,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: "white",
                                marginLeft: 5,
                                marginTop:20,
                            }} dropdownStyle={{
                                borderRadius: 4,
                                width: wp('52%'),
                                height:150,
                                borderRadius: 2,
                                borderWidth: 5,
                                borderColor: "white"
                            }} />
                            <Text style={styles.insideText}>{this.state.dateStart}{"\n"}{this.state.dateEnd}{"\n"}{this.state.stockName}{"\n"}{this.state.periodType}</Text>
                            <TouchableOpacity style={styles.buttonContainer1}>
                                <Text style={styles.buttonText1} onPress={this.postData}>Go !</Text>
                            </TouchableOpacity>
                        </Card>

                
                
                 
            </View>
            <TouchableOpacity onPress = {() => this.signOutUser()} style={styles.signoutContainer}><Text style={styles.buttonText}>Sign Out</Text></TouchableOpacity>
            </ImageBackground>
            </KeyboardAvoidingView> 

                
            

        )
    }
        
            
    }

const styles = StyleSheet.create({

    container : {
        flex :1 ,
    },
    Header :{
        marginTop:20,
        marginLeft:60,
        marginRight:60,
        marginBottom:30,
        textAlign:"center",
        fontSize:15,
        fontWeight:'bold',
        color:'white'

    },
    logo:{
        width:10,
        

    },
    logoContainer:{
            alignItems:"center",
            flexGrow:1,
            justifyContent:"center"
    },
    title:{
        color:'white',
        textAlign:"center",
        fontWeight:"bold"
    },
    buttonContainer:{
        paddingVertical:10,
        marginTop:30,
       
      
    },
    signoutContainer:{
        paddingVertical:10,
        marginTop:100,
    },
    touchableText:{
        textAlign:"center",
        color:'white',
        fontWeight:"bold",
        opacity:1,
        marginTop:15,
        
    },
    buttonText:{
        textAlign:"center",
        color:'white',
        fontWeight:"bold",
        opacity:1,
        
    },
    buttonContainer1:{
        backgroundColor:'#2cbab2',
        paddingVertical:10,
        alignSelf:"flex-end",
        marginLeft:60,
        marginRight:10,
        marginTop:10,
        width:100,
        
    },
    buttonText1:{
        textAlign:"center",
        color:'white',
        fontWeight:"bold"
        
    },
    cardimage:{
        height:100,
        width:200,
        marginTop:40,
        borderRadius:6,
        shadowOffset:{width:5,height:5},
        shadowColor:'#8cf1f5',
        shadowOpacity:0.2,
    },
    backgroundImage:{
        flex:1,
        resizeMode:"cover"
    },
    insideText:{
        color:'white',
        fontWeight:"bold",
        opacity:1,
        marginTop:10,
        marginLeft:68,
        marginBottom:3,
        fontSize:12,
    }
});

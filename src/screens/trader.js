import * as React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, ImageBackground,TouchableWithoutFeedback,Keyboard,Slider } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Card from '../shared/tradeRobotCard'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import MultiSelect from 'react-native-multiple-select';
import * as firebase from 'firebase'

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
const customData = require('../shared/bist100.json');

export default class trader extends React.Component {
    constructor(props) {
        super(props)
       
        this.state = ({
            budget:'0',
            minimumValue:'5000',
            maximumValue:'100000'
           
        })
       
        


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
                if (this.state.selectedItems != 0 ) {
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

    signOutUser = () => firebase.auth().signOut().then(() => {
        this.props.navigation.navigate('Login')
    }).catch(function (error) {
        alert(error)
        return error;
    });;
    render() {
        const { selectedItems } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
                <ImageBackground style={styles.backgroundImage} source={require('../img/bg-signup.jpg')}>
                    <View>
                        <Text style={styles.Header}>Welcome</Text>
                        <Text style={styles.Header}>You have selected Arima Model</Text>

                    </View>
                    <View style={{
                        flexDirection: "row",

                    }}>

                        
                        <Card><Text style={styles.touchableText}>ARIMA</Text>

                           
                            <MultiSelect
                                hideTags
                                items={customData}
                                uniqueKey="Name"
                                onSelectedItemsChange={(selectedItems)=>{this.setState({selectedItems})}}
                                selectedItems={selectedItems}
                                selectText="  Pick Items"
                                searchInputPlaceholderText="Search Items..."
                                onChangeInput={(text) => console.log(text)}
                                tagRemoveIconColor="black"
                                tagBorderColor="black"
                                tagTextColor="black"
                                selectedItemTextColor="black"
                                selectedItemIconColor="black"
                                itemTextColor="black"
                                displayKey="Name"
                                searchInputStyle={{ color: '"black"' }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                                styleDropdownMenu={{
                                    width: wp('85%'),
                                    marginLeft : wp('5%'),
                                    marginTop : wp('5%'),
                                    
                                }}
                                
                                styleDropdownMenuSubsection={
                                    {
                                        
                                    }
                                }
                                styleListContainer={{
                                    height: hp ('50%')
                                }}
                            />
                        
                           <Slider
                                    style={{ width: wp('75%'), height: hp('5%'), position: "absolute", left: 40, right: 40, top: 250 }}
                                    step={1}
                                    maximumValue={this.state.maximumValue}
                                    minimumValue={this.state.minimumValue}
                                    value={this.state.minimumValue}
                                    onValueChange={val => this.setState({ budget: val })}
                                    
                                    thumbTintColor='#2cbab2'
                                    maximumTrackTintColor='#d3d3d3'
                                    minimumTrackTintColor='#2cbab2'

                                />

                            <Text style={{textAlign:"center",position:"absolute",top:300,left:40,right:40,color:"white",fontSize:15,fontWeight:"bold"}}>Your budget : {this.state.budget} $</Text>

                            
                                

                        </Card>
                        
                        


                    </View>
                    <TouchableOpacity style={styles.buttonContainer1}>
                                    <Text style={styles.buttonText1} onPress={() => this.props.navigation.navigate('ArimaModel')}>Go !</Text>
                                </TouchableOpacity>
                </ImageBackground>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

 


        )
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    Header: {
        
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
        bottom:2,
        left: 0,
        right: 0,
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
        alignSelf:'flex-end',
        position: 'absolute',
        bottom:73,
        right: 0,
        width: 100,
       

    },
    buttonText1: {
        textAlign: "center",
        color: 'white',
        fontWeight: "bold"

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

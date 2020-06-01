import * as React from 'react';
import {View , Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}> 
                 { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius:6,
        elevation:3,
        shadowOffset:{width:5,height:5},
       
        shadowOpacity:0.2,
        height: hp('15%'),
        width: wp('90%'),
        backgroundColor:"#383737",
        opacity:0.8
        
    },


})

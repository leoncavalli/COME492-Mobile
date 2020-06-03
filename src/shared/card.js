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
        
        marginTop: 40,
        height: hp('80%'),
        width: wp('100%'),
        opacity: 0.9
        
    },


})
